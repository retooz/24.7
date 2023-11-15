const passport = require('passport');
const local = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const conn = require('../../config/database');
const homeService = require('../services/homeService')
const userQueries = require('../queries/userQueries')
const trainerQueries = require('../queries/trainerQueries')


//로그인 성공 0 아니면 1
passport.use('local-login-user', new local({
    usernameField: 'email',
    passwordField: 'pw',
    session: true,
}, async (email, pw, done) => {
    try {

        const [userRows] = await conn.query(userQueries.signInCheck, [email], (err,rows) => {
        })
        const user = userRows[0]
        console.log('user', user)
        const same = bcrypt.compareSync(pw, user.pw)
        if (same) {
            console.log('success')
            return done(null, user)
        }
        console.log('fail')
        return done(null, false, { message: '로그인에 실패하였습니다.' })

    } catch (err) {
        console.log(err)
        return done(err)
    }
}));

passport.use('local-login-trainer', new local({
    usernameField: 'userId',
    passwordField: 'password',
    session: true,
}, (userId, password, done) => {
    console.log('passport의 trainer login :', userId, password)
}))

passport.serializeUser(function (user, done) {
    console.log('serializeUser() 호출');
    console.log(user.email);
    done(null, user.email)
})

passport.deserializeUser(async (user, done) => {
    console.log('deserializeUser() 호출');
    done(null, null)
})

module.exports = passport