var express = require('express');
var router = express.Router();
const bookRouters = require('./book');
const categoryRouters = require('./category');
const titleRouters = require('./title');
const articleRouters = require('./article');
const userRouters = require('./user')
const smsCodeRouters = require('./smsCode')
const uploadRouters = require('./upload')
const swiperRouters = require('./swiper')
const collectRouters = require('./collection')
const readListRouters = require('./readlist')

router.use('/book', bookRouters)
router.use('/category', categoryRouters)
router.use('/titles', titleRouters)
router.use('/article', articleRouters)
router.use('/user', userRouters)
router.use('/smsCode', smsCodeRouters)
router.use('/uploadToken', uploadRouters)
router.use('/swiper', swiperRouters)
router.use('/collect', collectRouters)
router.use('/readList', readListRouters)

module.exports = router;
