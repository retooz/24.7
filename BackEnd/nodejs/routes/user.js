const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport.js');
const queries = require('../config/queries');
const conn = require('../config/database');

router.post('/login',passport.authenticate('local-login',{
    successRedirect : '/loginSuccess',
    failureRedirect : '/loginFail',
    failureFlash : true
}))

router.post('/join',(req,res)=>{
    console.log('user join Router')
    let {userEmail,userPw,nickName} = req.body
    console.log(`email : ${userEmail} , userPw : ${userPw}, nickName : ${nickName}`)
    conn.query(queries.selectUserEmail,[userEmail],(err,rows)=>{
        console.log('rows',rows.length)
        if(rows.length > 0){
            res.send(`<script>alert('이미 존재하는 이메일입니다.');location.href='http://localhost:3000';</script>`);
        }
        else{
            const cryptedPW = bcrypt.hashSync(userPw,10);
            conn.query(queries.signUp,[userEmail,cryptedPW,nickName],(err,result)=>{
                console.log('result',result)
                console.log(err)
                res.send(`<script>alert('회원가입에 성공하였습니다');location.href='http://localhost:3000;</script>`);
            })
        }
    })
})

router.post('/find_password',(req,res)=>{
    console.log('find_password router')
    console.log(req.body)
    let {userEmail,password,checkPassword} = req.body
    // conn.query(queries.searchPassword,[userEmail],(err,idResult)=>{
    //     console.log('id query',idResult)
    // })
})

module.exports = router;

// if(idResult.length > 0){
//     const same = bcrypt.compareSync(password,idResult[0].pw);
//     console.log('same',same)
//     if(same){
//     }
// }