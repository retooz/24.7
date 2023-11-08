const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const session = require('express-session');
const fileStore = require('session-file-store')(session);

app.use(cors());
app.use(bodyParser.json()); //요청 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+'/public'));

app.use(session({
  httpOnly : true,
  resave : false,
  secret : 'secret',
  store : new fileStore(),
  saveUninitialized: false,
  expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
}))

app.get('/', (req,res) => {
    console.log('Hello World!')
}) 

app.listen(3000, () => {
  console.log("Node.js server is running on port 3000");
});