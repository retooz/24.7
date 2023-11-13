const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport');

router.get('/',(req,res)=>{
    res.render('index')
})

// router.post('/login',
// passport.authenticate('local-login',{
//     successRedirect : '/',
//     failureRedirect : '/loginFail',
//     failureFlash : true
// }))

// router.get('/loginSuccess',(req,res)=>{
//     res.render('loginSuccess')
// })

// router.get('/loginFail',(req,res)=>{
//     res.render('loginFail')
// })

module.exports = router;