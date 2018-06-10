// require the bits needed to run Passport
const passport = require('passport');
const SalesforceStrategy = require('passport-salesforce').Strategy;

// setup the variables needed to run Salesforce connected app
const clientId = process.env.SFCLIENTID;
const clientSecret = process.env.SFCLIENTSECRET;
const callbackUrl = process.env.APP_URL + 'auth/callback';

// setup some DB stuff here when ready (postgres stuff)



// serialise and deserialse user functions go here. Passport uses these
// to interact with the session data
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // database query to find user by id in postgres - TODO
    console.log('user was found by id');
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
    });
)