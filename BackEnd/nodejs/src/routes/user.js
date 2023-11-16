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
    try {
        const cryptedPW = bcrypt.hashSync(data.pw, 10);
        const result = await homeService.join(data, cryptedPW);
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
        const userEmail = req.body.email;
        const result = await homeService.duplicateCheck(userEmail);
        if (result.length > 0) {
            res.json({ result: 1 });
        } else {
            res.json({ result: 0 });
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
        console.log("1", req.body)
        const result = await homeService.signInCheck(userEmail)
        if (result.length > 0) {
            const same = bcrypt.compareSync(req.body.pw, result[0].pw)
            if (same) {
                res.json({ result: 1 });
            }
        } else {
            res.json({ result: 0 });
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/modify', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const nickname = req.body.nickname;
        const cryptedPW = bcrypt.hashSync(req.body.pw, 10);
        const result = await homeService.updatePassword(userEmail, cryptedPW);
        if (result.affectedRows > 0) {
            const nickResult = await homeService.updateNickname(userEmail, nickname);
            if (nickResult.affectedRows > 0) {
                res.json({ result: 1 });
            }
        } else {
            res.json({ result: 0 });
        }
    } catch (error) {
        console.log(error);
    }
});

const uploadVideo = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'./public/uploads/video');
        },
        filename:function(req,file,cb){
            cb(null,`${req.session.userEmail}_${Date.now()}`);
        }
    })
})


router.post('/sandTrainer',uploadVideo.single('video'),async(req,res)=>{
    try{
        const trainer = await homeService.searchTrainer();
        const matchNum = Math.floor(Math.random()*trainer.length)

    }catch(err){
        console.log(err)
    }
})


module.exports = router;