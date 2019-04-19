const {Router} = require('express');
const router = Router();
const {getReadList} = require('../controller/readList')
const auth = require('../controller/auth')

router.get('/', auth, getReadList)

module.exports = router