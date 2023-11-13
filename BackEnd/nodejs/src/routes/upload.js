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

router.post('/uploadImg',uploadImg.single('profilePic'),(req,res)=>{
    console.log('uploadImg router');
    console.log('req',req.body)
    console.log(req.file)
    
})

module.exports = router;