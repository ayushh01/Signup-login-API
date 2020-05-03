const express = require('express');
const http =require('http');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authenticate = require('./authenticate');

const userRouter = require('./routes/UserRouter');

const hostname = 'localhost';
const port = 3000;

//-------------------database-----------------

const url = 'mongodb://localhost:27017/data';

const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log('Connected to Server!\n');
})

//-----------------------------------------------

const app =express();

app.use(logger('dev'));

app.use(session({
    name:'session-id',
    secret:'12345-67890-09876-54321',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRouter);

function auth(req,res,next){
    if(!req.user)
    {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        next(err);
    }
    else
    {
        next();
    }
}

app.use(auth);

app.use('/',(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.end('<html><body><h1>This is express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}`);
})