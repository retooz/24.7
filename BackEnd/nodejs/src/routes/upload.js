const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

fs.readdir('./public/uploads',(error)=>{
    // uploads 폴더 없으면 생성
    if(error){
        fs.mkdirSync('./public')
        fs.mkdirSync('./public/uploads');
        fs.mkdirSync('./public/uploads/img');
        fs.mkdirSync('./public/uploads/video');
    }
})

const uploadImg = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'./public/uploads/img');
        },
        filename:function(req,file,cb){
            cb(null,`${req.session.userId}_${Date.now()}`);
        }
    })
})
//http://10.0.2.2:3000/upload/uploadVideo
const uploadVideo= multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'./public/uploads/video');
        },
        filename:function(req,file,cb){
            cb(null,`${req.session.userId}_${Date.now()}`);
        }
    })
})

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, './public/uploads'); // uploads 폴더에 파일 저장
//         },
//         filename: function (req, file, cb) {
//             cb(null, `${req.session.userId}_${Date.now()}_${file.originalname}`);
//         },
//     })
// })

router.post('/uploadImg',uploadImg.single('profilePic'),(req,res)=>{
    console.log('uploadImg router');
    console.log('req',req.body)
    console.log(req.file)
})

router.post('/uploadVideo',uploadVideo.single())

module.exports = router;