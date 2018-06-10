// require the bits needed to run Passport
const passport = require('passport');
const SalesforceStrategy = require('passport-salesforce').Strategy;

// setup the variables needed to run Salesforce connected app
const clientId = process.env.SFCLIENTID;
const clientSecret = process.env.SFCLIENTSECRET;
const callbackUrl = process.env.APP_URL + 'auth/callback';