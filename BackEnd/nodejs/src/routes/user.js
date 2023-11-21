const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const homeService = require('../services/homeService.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

fs.readdir('./public/uploads', (error) => {
    if (error) {
        fs.mkdirSync('./public')
        fs.mkdirSync('./public/uploads');
        fs.mkdirSync('./public/uploads/img');
        fs.mkdirSync('./public/uploads/video');
    }
})
// let varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기  
// if ( varUA.indexOf('android') > -1) {     
//     //안드로이드 
//     console.log('android')
// } else if ( varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1 ) {     
//     //IOS 
//     console.log('IOS')
// } else {     
//     //아이폰, 안드로이드 외 모바일 
//     console.log('else')
// }

router.post('/join', async (req, res) => {
    const data = req.body;
    console.log('data',data)
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

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy();
        if (req.session == undefined) {
            res.json({ result: 1 })
        } else {
            res.json({ result: 0 })
        }
    } catch (err) {
        console.log(err)
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

const upLoadVideo = (req, res, next) => {
    try {
        const uploadVideo = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './public/uploads/video');
                },
                filename: function (req, file, cb) {
                    let time = new Date
                    let setTime = `${time.getFullYear()}${time.getMonth() + 1}${time.getDate()}${time.getHours()}${time.getMinutes()}`
                    const ext = path.extname(file.originalname)
                    cb(null, `${req.session.userEmail}_${setTime}` + ext);
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
    next();
}

router.post('/sendTrainer', upLoadVideo, async (req, res) => {
    try {
        const trainer = await homeService.searchTrainer();
        const matchNum = Math.floor(Math.random() * trainer.length)
        // 임시로 넣은 변수(나중에 지워야함)
        let accuracy = 0
        let accuracy_list = []
        let sum = 0
        let exercise_category = '런지'
        let user_comment = '자세교정 부탁드립니다.'
        let testUrl = '/public/uploads/video/user_email_time'
        for (let i = 0; i < 5; i++) {
            accuracy_list[i] = Math.floor(Math.random() * 100)
            sum += accuracy_list[i]
        }
        accuracy = sum / accuracy_list.length

        const result = await homeService.sendFeedback(req.user.email, trainer[matchNum].trainer_code, exercise_category, user_comment, accuracy, accuracy_list, testUrl);
        if (result.affectedRows > 0) {
            res.json({ result: 1 })
        } else {
            res.json({ result: 0 })
        }

    } catch (err) {
        console.log(err)
    }
})

router.post('/logout', (req, res) => {
    try {
        req.session.destroy();
        if (req.session == undefined) {
            res.json({ result: 1 })
        } else {
            res.json({ result: 0 })
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/getFeedback', async (req, res) => {
    try {
        const result = await homeService.getFeedback(userEmail);
        if (result.length > 0) {
            res.json({ result: result })
        } else {
            res.json({ result: null })
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/getData', async (req, res) => {
    try {
        const result = await homeService.getConnectionData(userEmail);
        if (result.length > 0) {
            res.json({ list: result })
        } else {
            res.json({ list: 0 })
        }
    } catch (err) {
        console.log(err)
    }
})

router.post('/test', async (req, res) => {
    try {
        const trainer = await homeService.searchTrainer();
        const matchNum = Math.floor(Math.random() * trainer.length)
        console.log('trainer : ', trainer)
        console.log('matchNum : ', matchNum)
        let accuracy = 0
        let accuracy_list = []
        let sum = 0
        let exercise_category = '스쿼트'
        let user_comment = '골반 자세가 너무 안잡혀서 고민입니다.'
        let testUrl = '/public/uploads/video/user_email_time'
        let email = 'qwe@gmail.com'
        for (let i = 0; i < 5; i++) {
            accuracy_list[i] = Math.floor(Math.random() * 100)
            sum += accuracy_list[i]
        }
        accuracy = sum / accuracy_list.length
        const result = await homeService.sendFeedback(email, trainer[matchNum].trainer_code, exercise_category, user_comment, accuracy, accuracy_list, testUrl);
        console.log('accuary', accuracy)
        console.log('accuary_list', accuracy_list)
        // const result1 = await homeService.getFeedback(email);
        // console.log('result1', result1)
        // if (result1 == null) {
        //     console.log('asdf')
        // } else {
        //     console.log('zxcz')
        // }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;