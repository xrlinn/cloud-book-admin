const {Router} = require('express')
const router = Router()
const {addCategory,
        getCategory,
        addBookToCategory,
        getBookOfCategory,
        getBookByCategory} = require('../controller/category')

router.post('/',addCategory)
router.get('/',getCategory)
router.post('/book', addBookToCategory)
router.get('/book', getBookOfCategory)
router.get('/:id/books', getBookByCategory)

module.exports = router