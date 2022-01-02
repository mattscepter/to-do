const auth = require('./auth.routes');
const index = require('./index.routes');
const links = require('./links.routes');
const user = require('./user.routes');

const express = require('express');
const router = express.Router();

router.use(index);
router.use(auth);
router.use(user);
router.use('/links', links);

module.exports = router;
