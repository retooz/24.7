const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const homeService = require('../services/homeService.js');
require('dotenv').config({ path: '../../.env' });

fs.readdir('./public/uploads', (error) => {
    if (error) {
        fs.mkdirSync('./public')
        fs.mkdirSync('./public/uploads');
        fs.mkdirSync('./public/uploads/img');
        fs.mkdirSync('./public/uploads/video');
    }
})

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
                req.session.user.email = userResult.email
                req.session.user.code = userResult.user_code
                res.send({ result: 1 })
            }
        } else {
            res.send({ result: 0 })
        }
    } catch (err) {
        res.status(500).json({ result: -1, error: "Internal Server Error" });
    }
})

/** 아이디가 저장되어있을 경우 자동로그인 */
router.post('/autoLogin', async (req, res) => {
    if (req.body.email) {
        console.log('자동로그인 성공');
        const result = await homeService.duplicateCheck(req.body.email)
        req.session.user.email = result[0].email
        req.session.user.code = result[0].user_code
    }
})

/** 로그인 */
router.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.email
        const loginResult = await homeService.duplicateCheck(userEmail);
        if (loginResult.length > 0) {
            const user = loginResult[0];
            const same = bcrypt.compareSync(req.body.pw, user.pw);
            if (same) {
                req.session.user = { email: userEmail, code: loginResult.user_code };
                res.json({ result: 1 });
            }
        }
        res.json({ result: 0 })
    } catch (err) {
        console.log(err)
    }
})

/** 로그아웃 */
router.post('/logout', async (req, res) => {
    try {
        res.session.destroy();
        if (req.session == undefined) {
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

    } catch (err) {
        res.status(500).json({ result: -1, err: "Internal Server Error" });
    }
});

/** 비밀번호 변경 */
router.post('/findPassword', async (req, res) => {
    try {
        const userEmail = req.session.email
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
        const userEmail = req.session.email;
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
    } catch (err) {
        console.log(err)
    }
})

/** 회원 정보 수정 */
router.post('/modify', async (req, res) => {
    try {
        const userEmail = req.session.email;
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
    } catch (err) {
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
            cb(null, `${req.session.code}_${setTime}` + ext);
        }
    })
})

/** 비디오 업로드, 트레이너에게 보내기 */
router.post('/sendTrainer', upLoadVideo, async (req, res) => {
    try {
        const response = await axios.post(`${process.env.FLASK_IP}/test`, { url: req.file.path });

        /** 저장된 비디오 커넥션 코드 파일로 옮기기 */
        const videoDirectory = path.join('public', 'uploads', 'video')
        const fileName = req.file.filename
        const newPath = path.join('public', 'uploads', 'video', `${connectionCode}`)
        fs.readdir(newPath, (error) => {
            if (error) {
                fs.mkdirSync(newPath);
                fs.renameSync(req.file.path, path.join(`${newPath}`, `${fileName}`))
            };
        });

    } catch (err) {
        console.log(err)
    }
})

/** connection 코드에 맞는 피드백 가져오기 */
router.post('/getFeedback', async (req, res) => {
    try {
        const connectionCode = req.body.connectionCode
        const result = await homeService.getFeedback(connectionCode);
        const trainer = await homeService.getTrainerInfo(connectionCode);
        const accuracyData = await homeService.getDataFeedback(connectionCode);
        if (result.length > 0) {
            res.json({ result: result, trainer: trainer, accuracyData: accuracyData })
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
        const userCode = req.session.code
        const result = await homeService.getConnectionData(userCode);
        const sortResult = result.connection_date.sort((a, b) => a - b);
        if (result.length > 0) {
            res.json({ list: sortResult })
        } else {
            res.json({ list: 0 })
        }
    } catch (err) {
        console.log(err)
    }
})

/** 트레이너의 피드백이 있는 connection 호출 */
router.get('/feedbackConfirm', async (req, res) => {
    try {
        const userCode = req.session.code
        const result = await homeService.alarmFeedback(userCode);
        if (result.length > 0) {
            res.json({ result: result })
        } else {
            res.json({ result: null })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;