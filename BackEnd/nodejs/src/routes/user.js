const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport.js');
const queries = require('../queries/userQueries.js');
const conn = require('../../config/database.js');
const homeService = require('../services/homeService.js');
const userQueries = require('../queries/userQueries.js');

router.post('/join', (req, res) => {
    console.log('user join Router')
    const data = req.body;
    try {
        const cryptedPW = bcrypt.hashSync(data.pw, 10);
        conn.query(userQueries.signUp, [data.email, cryptedPW, data.nick], (err, rows) => {
            if (rows.affectedRows > 0) {
                res.send({ result: 0 })
            } else {
                res.send({ result: 1 })
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
})

router.post('/emailCheck', (req, res) => {
    try {
        const userEmail = req.body.email; // 수정된 부분
        console.log(userEmail);
        conn.query(userQueries.duplicateCheck, [userEmail], (err, rows) => {
            if (rows.length > 0) {
                res.json({ result: 1 })
            } else {
                res.json({ result: 0 })
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
});

router.post('/find_password', (req, res) => {
    console.log('find_password router')
    console.log(req.body)
    let { userEmail, password, checkPassword } = req.body
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