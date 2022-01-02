const isLoggedIn = require('../lib/auth');
const { renderUserProfile } = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/profile', isLoggedIn, renderUserProfile);

module.exports = router;
