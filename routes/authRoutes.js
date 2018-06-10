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
// authroutes file will define a set of routes that
// are used for a Salesforce authentication flow
// grab the passport library
const passport = require('passport');

function salesforceAuth(router) {
    // Salesforce login route
    router.get('/auth/salesforce', passport.authenticate('salesforce', {
        scope: [
            'full'
        ]
    }));

    // Passport will manage the callback to this route
    router.get('/auth/callback', passport.authenticate('salesforce'), (req, res) => {
        // everything is authenticated so redirect to root
        console.log('in the callback the access token from the session is: ' + req.session.accessToken);
        res.redirect('/');
    });

    // logout route
    router.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // route to check current user
    router.get('/api/current_user', (req, res) => {
        res.setHeader('content-type', 'text/javascript; charset=utf-8');
        res.send(req.user);
    });
}

module.exports = {
    salesforceAuth: salesforceAuth
};
