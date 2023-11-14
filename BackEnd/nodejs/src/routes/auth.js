const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport');

router.post('/userLogin',passport.authenticate('local-login-user', {failWithError: true}),
function(req,res,next) {
    console.log(req.user)
    res.json({result:0})
},
function(req,res,next) {
    res.json({result:1})
}
// {
//     successRedirect:'/loginSuccess',
//     failureRedirect:'/loginFail',
//     failureFlash:true
// }
)

// router.post('/trainerLogin',passport.authenticate('local-login-trainer',{
//     successRedirect : '/loginSuccess',
//     failureRedirect : '/loginFail',
//     failureFlash : true
// }))

router.get('/loginSuccess',(req,res)=>{
    console.log('여기까지 왔나?')
    res.send({result:0})
})

router.get('/loginFail',(req,res)=>{
    console.log('여기까지 왔나?')

    res.send({result:1})
})


module.exports = router;
// router.get('/kakao',passport.authenticate('kakao'));

// router.get('/kakao/callback',passport.authenticate('kakao',{
//     failureRedirect:'/auth/login', // 로그인에 실패하면 이동 할 라우터
// }),(req,res)=>{
//     res.redirect(`/${req.user.user_id}`)
// })
