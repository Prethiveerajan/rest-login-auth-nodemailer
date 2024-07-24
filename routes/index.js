const express = require('express');
const router = express.Router();
const { GetUser, resetPassToken, CheckPassword, authenticate, resetPass } = require('../controllers'); 
const authenticateToken = require('../middleware'); 

router.get('/user/:userId', GetUser);
router.get('/data', authenticateToken, authenticate);
router.post('/reset-app', resetPass);
router.post('/login', CheckPassword);
router.post('/reset-pass/:token', resetPassToken);

module.exports = router;
