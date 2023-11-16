const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const homeService = require('../services/homeService.js');
const multer = require('multer');
const fs = require('fs');

fs.readdir('./public/uploads',(error)=>{
    if(error){
        fs.mkdirSync('./public')
        fs.mkdirSync('./public/uploads');
        fs.mkdirSync('./public/uploads/img');
        fs.mkdirSync('./public/uploads/video');
    }
})

router.post('/join', async (req, res) => {
    const data = req.body;
    console.log('data', data)
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
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
})

router.post('/emailCheck', async (req, res) => {
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