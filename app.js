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
var server = require('http').createServer(app)
var io = require('socket.io')( server, { origins: '*:*',path: '/socket'} );
io.origins('*:*');

//var io = require('socket.io').listen(app.listen(3000),{path: '/api/socket.io'});
io.sockets.on('connection', function (socket) {
  console.log('client connect');
  socket.on('echo', function (data) {
    io.sockets.emit('message', data);
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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



/* Send Message. */
app.post('/sendMessage', function(req, res, next) {
  io.sockets.emit('tchat','salut');
  res.send('get DB');
});
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
