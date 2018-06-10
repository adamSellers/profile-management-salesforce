// require all the things needed for the app to work....
const createError = require('http-errors');
const express = require('express');
const redis = require('redis').createClient();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup some database access - TODO


// require the passport stuff
require('./services/passport');

// session setup using Redis (check the app.json file!)
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// import the routes required for the app
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware setup
// start with the session handling
app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL,
    client: redis
  }),
  secret: process.env.SESSIONKEY,
  resave: false,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
