const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
const passport = require('passport');

const User = require('../models/users');

route.use(bodyParser.json());

route.get('/',(req,res,next)=>{
    res.end('Will Send Data');
});


route.post('/signup',(req,res,next)=>{
    User.register(new User({username:req.body.username}), req.body.password ,(err,user) =>{
        if(err)
        {
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json({err:err});
        }
        else
        {
            passport.authenticate('local')(req,res,()=>{
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                res.json({success: true, status: 'Registration Successful!'});
            });
        }
    });
});

route.post('/login',passport.authenticate('local'),(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','application/json');
    res.json({success: true, status: 'You are logged on'});
});

route.get('/logout',(req,res,next)=>{
    if(req.user)
    {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/home');       
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
      }
});

module.exports = route;