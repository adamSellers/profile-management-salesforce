const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// import the Salesforce Auth Routes
authRoutes.salesforceAuth(router);

module.exports = router;
