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
        res.redirect('/');
    });
}

module.exports = {
    salesforceAuth: salesforceAuth
};