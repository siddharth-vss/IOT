const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const logger = require('morgan');

const http = require("http");
const socket = require("socket.io");

const server = http.createServer(app);
const io = socket(server);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// view engine setup
app.use(express.static(path.join(__dirname, "public")));

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get("/", (req, res) => {
  res.render("index",{ title: 'Express' });
});
app.get("/host", (req, res) => {
  res.render("host",{ title: 'Express' });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// app.listen(3000,()=>{
//   console.log(`http://localhost:3000`);
// })









io.on("connection", (socket) => {
  socket.on("send", (data) => {
      io.emit("sendC",data);
  });

  socket.on("ACKC",(data)=>{
      io.emit("ACK",data);
  })

  socket.on("disconnect",()=>{
    io.emit("user-disconnect",socket.id);
  })
});

server.listen(3000, () => {
  console.log(`server running on http://localhost:3000`);
});