const passport = require('passport');
const local = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const conn = require('../../config/database');
const homeService = require('../services/homeService')
const userQueries = require('../queries/userQueries')
const trainerQueries = require('../queries/trainerQueries')

passport.use('local-login-user', new local({
    usernameField: 'email',
    passwordField: 'pw',
    session:true,
}, (email, pw, done) => {
    console.log("벡으로 넘어오나?",email)
    conn.query(userQueries.signInCheck,[email],(err,result)=>{
        if(result.length > 0){
            const same = bcrypt.compareSync(pw, result[0].pw);
            if(same){
                console.log('로그인 성공')
                return done(null,result)
            }
        }
        console.log('로그인 실패')
        return done(null, false, { message: '로그인에 실패하였습니다.' })
    })
}));

passport.use('local-login-trainer',new local({
    usernameField : 'userId',
    passwordField : 'password',
    session:true,
},(userId,password,done)=>{
    console.log('passport의 trainer login :',userId,password)
}))

passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출');
    console.log( user[0].email);
    done(null, user[0].email)
})

passport.deserializeUser(function (user, done) {
    console.log('deserializeUser() 호출');
    console.log(user);
    conn.query(userQueries.duplicateCheck,[user],(err,result)=>{
        done(null,result);
    })
    // done(null, user);
})

module.exports = passport