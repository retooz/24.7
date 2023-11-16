const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const bcrypt = require('bcrypt');
const passport = require('../passport/passport');

router.post(
  '/userLogin',
  passport.authenticate('local-login-user', { failWithError: true }),
  function (req, res, next) {
    console.log(req.user);
    res.json({ result: 0 });
  },
  function (req, res, next) {
    res.json({ result: 1 });
  }
);

router.post(
  '/trainerLogin',
  passport.authenticate('local-login-trainer', {}),
  function (req, res, next) {
    console.log(req.user);
    res.json({ result: 'ok' });
  },
  function (req, res, next) {
    res.json({ result: 1 });
  }
);

router.get('/loginSuccess', (req, res) => {
  res.send({ result: 0 });
});

router.get('/loginFail', (req, res) => {
  res.send({ result: 1 });
});

module.exports = router;
