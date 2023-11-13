const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport');

router.post('/userLogin',passport.authenticate('local-login-user',{
    successRedirect:'/loginSuccess',
    failureRedirect:'/loginFail',
    failureFlash:true
}))

// router.post('/trainerLogin',passport.authenticate('local-login-trainer',{
//     successRedirect : '/loginSuccess',
//     failureRedirect : '/loginFail',
//     failureFlash : true
// }))

router.get('/loginSuccess',(req,res)=>{
    res.render('loginSuccess')
})

router.get('/loginFail',(req,res)=>{
    res.render('loginFail')
})

module.exports = router;
// router.get('/kakao',passport.authenticate('kakao'));

// router.get('/kakao/callback',passport.authenticate('kakao',{
//     failureRedirect:'/auth/login', // 로그인에 실패하면 이동 할 라우터
// }),(req,res)=>{
//     res.redirect(`/${req.user.user_id}`)
// })
