const express = require('express')
const router = express.Router()
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport.js');
const path = require('path')
const trainerService = require('../services/trainerService.js');
const uploadImg = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/profile')
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname)
            cb(null, `${req.body.userEmail}_${Date.now()}`+ext)
        }
    })
})

router.get('/',(req,res) => {
    res.render('trainer');
})

router.post('/join', uploadImg.single('profilePic'), async (req,res) => {
    const data = req.body;
    let profilePic = null;
    if (req.file !== undefined) {
        profilePic = req.file.filename;
    }
    try {
        const cryptedPW = bcrypt.hashSync(data.pw, 10);
        const result = await trainerService.join(data, cryptedPW, profilePic)
        if (result.affectedRows > 0) {
            res.json({ message: 'join success', result : 0 })
        }
    } catch (err) {
        res.status(500).json({ message: 'error occured' })
    }
})

router.post('/emailCheck', async (req, res) => {
    console.log('emailcheck router')
    try {
        const trainerEmail = req.body.email;
        const result = await trainerService.duplicateCheck(trainerEmail);
        if (result.length > 0) {
            res.json({ result: 'fail' })
        } else {
            res.json({ result: 'ok' })
        }
    } catch (err) {
        res.status(500).json({ message: 'error occured' })
    }
})

router.post('/getMemberList', async (req, res) => {
    console.log('getMemberList')
    try {
        const { trainer_code } = req.body;
        const result = await trainerService.getMemberList(trainer_code);
        console.log(result)
        res.json({ list: result })
    } catch (err) {
        res.status(500).json({ message: 'error occured' })
    }
})

router.post('')

module.exports = router;