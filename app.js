var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


/*mongoose.connect('mongodb://consort:f6N7tHDlDI9GWOzW1SnhRht3O8PCkIUnv6vG9noFQrl8T2dfYcExvXGAt7pKYdbXK6KpPZTMFBn8gXXndMl3vg%3D%3D@consort.documents.azure.com:10255/?ssl=true&replicaSet=globaldb');
var db = mongoose.connections;*/

var db = mongoose.connect('mongodb://consort:f6N7tHDlDI9GWOzW1SnhRht3O8PCkIUnv6vG9noFQrl8T2dfYcExvXGAt7pKYdbXK6KpPZTMFBn8gXXndMl3vg%3D%3D@consort.documents.azure.com:10255/?ssl=true', function(error){
    if(error) console.log(error);
      console.log("connection successful");
});
var db = mongoose.connections;
console.log('test conx');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter    = require('./routes/db');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dbs', dbRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;