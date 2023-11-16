const passport = require('passport');
const local = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const conn = require('../../config/database');
const userQueries = require('../queries/userQueries')
const trainerQueries = require('../queries/trainerQueries')

//로그인 성공 0 아니면 1
passport.use('local-login', new local({
    usernameField: 'email',
    passwordField: 'pw',
    session: true,
    passReqToCallback: true
}, async (req, email, pw, done) => {
    try {
        const type = req.body.type;
        let [userRows] = []
        if (type == 'u') {
            [userRows] = await conn.query(userQueries.signInCheck, [email], (err,rows) => {})
        } else if (type == 't') {
            [userRows] = await conn.query(trainerQueries.signIn, [email], (err,rows) => {})
        }
        const user = userRows[0]
        const same = bcrypt.compareSync(pw, user.pw)
        if (same) {
            return done(null, user)
        }
        return done(null, false, { message: 'login failed' })
    } catch (err) {
        console.log(err)
        return done(err)
    }
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