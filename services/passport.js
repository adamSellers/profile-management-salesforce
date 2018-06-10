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
const db = pgp(process.env.DATABASE_URL);

// serialise and deserialse user functions go here. Passport uses these
// to interact with the session data
passport.serializeUser(function (user, done) {
    console.log('user id is: ' + user.id);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // query the db to find an existing user
    console.log('we\'re probably going to wait here a bit..');
});

// setup the Salesforce Strategy
passport.use(
    new SalesforceStrategy({
        clientID: clientId,
        clientSecret: clientSecret,
        callbackURL: callbackUrl,
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        // TODO - test postgres for existing user on profile.user_id from SF
        // if existingUser => { do stuff }
        // else createUser!
        // but for now
        console.log('salesforce profile info: ' + JSON.stringify(profile));
    })
);
