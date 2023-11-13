const express = require('express')
const router = express.Router()
const axios = require("axios");
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport.js');
const queries = require('../queries/trainerQueries.js');
const conn = require('../../config/database.js');

router.get('/',(req,res)=>{
    res.render('trainer');
})

router.post('/join',(req,res)=>{
    console.log('trainer Join')
    console.log(req.body)
})

module.exports = router;