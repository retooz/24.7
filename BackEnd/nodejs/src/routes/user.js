const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const homeService = require('../services/homeService.js');
require('dotenv').config({path:'../../.env'});

fs.readdir('./public/uploads', (error) => {
    if (error) {
        fs.mkdirSync('./public')
        fs.mkdirSync('./public/uploads');
        fs.mkdirSync('./public/uploads/img');
        fs.mkdirSync('./public/uploads/video');
    }
})

const cookieConfig = {
    maxAge: 1000 * 60 * 60 * 24 * 180,
};

/** 회원가입 */
router.post('/join', async (req, res) => {
    const data = req.body;
    try {
        // 비밀번호 암호화
        const cryptedPW = bcrypt.hashSync(data.pw, 10);
        const result = await homeService.join(data, cryptedPW);
        if (result.affectedRows > 0) {
            const userResult = await homeService.duplicateCheck(data.email);
            if (userResult.length > 0) {
                res.cookie('email', userResult.email, cookieConfig);
                res.cookie('code', userResult.user_code, cookieConfig);
                res.send({ result: 1 })
            }
        } else {
            res.send({ result: 0 })
        }
    } catch (err) {
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
})

/** 로그인 */
router.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.userEmail
        if (req.cookies.email) {
            const userResult = await homeService.duplicateCheck(userEmail);
            res.clearCookie('email');
            res.clearCookie('code');
            res.cookie('email', userResult.email, cookieConfig);
            res.cookie('code', userResult.user_code, cookieConfig);
            res.send({ result: 1 });
        } else {
            const loginResult = await homeService.duplicateCheck(userEmail);
            if (loginResult.length > 0) {
                const user = loginResult[0];
                const same = bcrypt.compareSync(req.body.pw, user.pw);
                if (same) {
                    res.cookie('email', userEmail, cookieConfig);
                    res.cookie('code', loginResult.user_code, cookieConfig);
                    res.json({ result: 1 });
                }
            }
            res.json({ result: 0 })
        }
        res.json({ result: 0 });
    } catch (err) {
        console.log(err)
    }
})

/** 로그아웃 */
router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('email');
        res.clearCookie('code');
        if (req.cookies.email == undefined) {
            res.json({ result: 1 })
        } else {
            res.json({ result: 0 })
        }
    } catch (err) {
        console.log(err)
    }
})

/** 이메일 중복 확인 */
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
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
});

/** 비밀번호 변경 */
router.post('/findPassword', async (req, res) => {
    try {
        const userEmail = req.cookies.email
        const newPw = req.body.newPw
        const cryptedPW = bcrypt.hashSync(newPw, 10);
        const result = await homeService.updatePassword(userEmail, cryptedPW)
        if (result.affectedRows > 0) {
            res.json({ result: 1 });
        } else {
            res.json({ result: 0 });
        }
    } catch (error) {
        console.log(err)
    }
})

/** 비밀번호 찾기 */
router.post('/passwordCheck', async (req, res) => {
    try {
        const userEmail = req.cookies.email;
        const result = await homeService.signInCheck(userEmail)
        if (result.length > 0) {
            // 암호화된 비밀번호를 가져와서 같은지 확인
            const same = bcrypt.compareSync(req.body.pw, result[0].pw)
            if (same) {
                res.json({ result: 1 });
            }
        } else {
            res.json({ result: 0 });
        }
    } catch (error) {
        console.log(err)
    }
})

/** 회원 정보 수정 */
router.post('/modify', async (req, res) => {
    try {
        const userEmail = req.cookies.email;
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
        console.log(err)
    }
});

/** 비디오 저장할때 오류호출 함수 */
const upLoadVideo = (req, res, next) => {
    try {
        uploadVideo.single('video')(req, res, (err) => {
            if (err) {
                return res.status(500).json({ result: -1, error: "파일 업로드 오류" });
            }
            next();
        });
    } catch (err) {
        res.status(500).json({ result: -1, error: "내부 서버 오류" });
    }
};

/** 비디오 저장 함수 */
const uploadVideo = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join('public', 'uploads', 'video'));
        },
        filename: function (req, file, cb) {
            let time = new Date
            let setTime = `${time.getFullYear()}${time.getMonth() + 1}${time.getDate()}${time.getHours()}${time.getMinutes()}`
            const ext = path.extname(file.originalname)
            cb(null, `${req.cookies.code}_${setTime}` + ext);
        }
    })
})

/** 비디오 업로드, 트레이너에게 보내기 */
router.post('/sendTrainer', upLoadVideo, async (req, res) => {
    try {
        const response = await axios.post(`${process.env.FLASK_IP}/test`, { url: req.file.path });

        // const result = await homeService.sendFeedback(req.cookies.code, trainer[matchNum].trainer_code, exercise_category, user_comment, accuracy, accuracy_list, testUrl);
        // if (result.affectedRows > 0) {
        //     res.json({ result: 1 })
        // } else {
        //     res.json({ result: 0 })
        // }

    } catch (err) {
        console.log(err)
    }
})

/** connection 코드에 맞는 피드백 가져오기 */
router.post('/getFeedback', async (req, res) => {
    try {
        const userCode = req.cookies.code
        const result = await homeService.getFeedback(userCode);
        if (result.length > 0) {
            res.json({ result: result })
        } else {
            res.json({ result: null })
        }
    } catch (err) {
        console.log(err)
    }
})

/** 유저의 피드백 전부 가져오기 */
router.post('/getData', async (req, res) => {
    try {
        const userCode = req.cookies.code
        const result = await homeService.getConnectionData(userCode);
        if (result.length > 0) {
            res.json({ list: result })
        } else {
            res.json({ list: 0 })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;