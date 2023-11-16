const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport.js');
const conn = require('../../config/database.js');
const trainerService = require('../services/trainerService.js');
const uploadImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/profile')
        },
        filename: function (req, file, cb) {
            cb(null, `${req.body.userEmail}_${Date.now()}`)
        }
    })
})

router.get('/',(req,res) => {
    res.render('trainer');
})

router.post('/join', uploadImg.single('profilePic'), async (req,res) => {
    // console.log('trainer Join')
    // console.log(req.body)
    const data = req.body;
    const profilePic = req.file.filename;
    try {
        const cryptedPW = bcrypt.hashSync(data.pw, 10);
        const result = await trainerService.join(data, cryptedPW, profilePic)
        if (result.affectedRows > 0) {
            res.json({message: 'join success'})
        }
    } catch (err) {
        res.status(500).json({ message: 'error occured' })
    }
})

router.post('/emailCheck', async (req, res) => {
    console.log('emailcheck router')
    try {
        const trainerEmail = req.body.email;
        const result = await trainerService.duplicateCheck(trainerEmail)
        if (result.length > 0) {
            res.json({ result: 'fail' })
        } else {
            res.json({ result: 'ok' })
        }
    } catch (err) {
        res.status(500).json({ message: 'error occured' })
    }


})

router.post('')

module.exports = router;