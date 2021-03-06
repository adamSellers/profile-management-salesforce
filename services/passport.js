// Copyright 2018, Adam Sellers - Sales Engineering, Salesforce.com Inc.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// - Redistributions of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
// - Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
// - Neither the name of the salesforce.com nor the names of its contributors
//   may be used to endorse or promote products derived from this software
//   without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// *********************************************************************************/
// require the bits needed to run Passport
const passport = require('passport');
const SalesforceStrategy = require('passport-salesforce').Strategy;

// setup the variables needed to run Salesforce connected app
const clientId = process.env.SFCLIENTID;
const clientSecret = process.env.SFCLIENTSECRET;
const callbackUrl = process.env.APP_URL + 'auth/callback';

// intialise pg-promise library to use Bluebird and connect to postgres
const Promise = require('bluebird');
const initOptions = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(initOptions);
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

// serialise and deserialse user functions go here. Passport uses these
// to interact with the session data
passport.serializeUser(function (user, done) {
    console.log('user details in serialize function: ' + JSON.stringify(user));
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // query the db to find an existing user
    console.log('user id in the deserialze is: ' + id);
    db.one('SELECT * from salesforce.user WHERE Id = $1 LIMIT 1', [id])
        .then((results) => {
            console.log('deserialized a user!');
            done(null, results);
        });
});

// setup the Salesforce Strategy
passport.use(
    new SalesforceStrategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: callbackUrl,
        proxy: true,
        authorizationURL: process.env.SFCOMMUNITYURL + '/services/oauth2/authorize',
        tokenURL: process.env.SFCOMMUNITYURL + '/services/oauth2/token',
        profileURL: process.env.SFCOMMUNITYURL + '/services/oauth2/userinfo'
    }, async (accessToken, refreshToken, profile, done) => {
        // test if user exists
        console.log('salesforce profile info: ' + JSON.stringify(profile));
        try {
            let userId = profile.user_id;
            console.log('trying something here, userid is: ' + userId);
            var existingUser = await db.one('SELECT * from salesforce.user WHERE salesforce.user.sfid = $1', userId);
            console.log('user found: ' + JSON.stringify(existingUser));
        } catch (e) {
            console.error('catching the error: ' + e);
            existingUser = false;
        }

        if (existingUser) {
            // user exists, return the existing user
            done(null, existingUser);
        } else {
            // user doesn't exist so this should break.
            console.log('we will write something that breaks here');
            done(null);
        }
    })
);
