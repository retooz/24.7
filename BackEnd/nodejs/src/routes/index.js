const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport.js');

router.get('/',(req,res)=>{
    res.render('index')
})

router.post('/',passport.authenticate('local-login',{
    successRedirect : '/loginSuccess',
    failureRedirect : '/loginFail',
    failureFlash : true
}))

router.get('/loginSuccess',(req,res)=>{
    res.render('loginSuccess')
})

router.get('/loginFail',(req,res)=>{
    res.render('loginFail')
})

module.exports = router;