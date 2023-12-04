const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const path = require('path')
const fileStore = require('session-file-store')(session);
const morgan = require('morgan');

app.use(morgan('dev'));
const userRouter = require('./src/routes/user');
const trainerRouter = require('./src/routes/trainer');
require('dotenv').config();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'web_24_7', 'build')));

app.use(session({
    httpOnly: true,
    resave: false,
    secret: 'secret',
    store: new fileStore(),
    saveUninitialized: false,
    expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
}));

app.use('/', trainerRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log("Node.js server is running on port 3000");
});