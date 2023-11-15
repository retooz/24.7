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

router.post('/join', async (req, res) => {
    console.log('user join Router')
    const data = req.body;
    console.log('data', data)
    try {
        const cryptedPW = bcrypt.hashSync(data.pw, 10);
        const result = await homeService.join(data, cryptedPW)
        if (result.affectedRows > 0) {
            res.send({ result: 0 })
        } else {
            res.send({ result: 1 })
        }
    } catch (err) {
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
})

router.post('/emailCheck', async (req, res) => {
    try {
        const userEmail = req.body.email; // 수정된 부분
        const result = await homeService.duplicateCheck(userEmail)
        console.log(result)
        if (result.length > 0) {
            res.json({ result: 1 })
        } else {
            res.json({ result: 0 })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
});

router.post('/findPassword', async (req, res) => {

    try {
        let { email, newPw } = req.body
        userEmail = req.body.email
        const cryptedPW = bcrypt.hashSync(newPw, 10);
        const result = await homeService.updatePassword(userEmail, cryptedPW)
        if (result.affectedRows > 0) {
            res.json({ result: 1 });
        } else {
            res.json({ result: 0 });
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/passwordCheck', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const result = await homeService.signInCheck(userEmail)
        if (result.length > 0) {
            const same = bcrypt.compareSync(req.body.pw, result[0].pw)
            if (same) {
                res.json({ result: 1 })
            }
        } else {
            res.json({ result: 0 })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/modify', async (req, res) => {
    try {
        const userEmail = req.body.email;
        console.log("213", req.body)
        const nickname = req.body.nickname;
        const cryptedPW = bcrypt.hashSync(req.body.pw, 10);
        const result = await homeService.updatePassword(userEmail, cryptedPW);
        if (result.affectedRows > 0) {
            const nickResult = await homeService.updateNickname(userEmail, nickname);
            if (nickResult.affectedRows > 0) {
                res.json({ result: 1 })
            }
        } else {
            res.json({ result: 0 })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;