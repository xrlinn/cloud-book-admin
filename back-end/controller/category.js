const categoryModel = require('../model/category')
const bookModel = require('../model/book')
const mongoose = require('mongoose')


async function addCategory (req,res,next) {
    try {
        const {title} = req.body;
        await categoryModel.create({
            title
        })

        res.json({
            code: 200,
            msg: '添加分类成功'
        })

    } catch (err) {
        next(err)
    }
}

async function getCategory (req,res,next) {
    try {
        const data = await categoryModel.find()
            .sort({_id: -1})
        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

async function addBookToCategory (req,res,next) {
    try {
        const {categoryId, bookId} = req.body;
        const category = await categoryModel.findOne({
            _id: mongoose.Types.ObjectId(categoryId)
        })
        const book = await bookModel.findOne({
            _id: mongoose.Types.ObjectId(bookId)
        })
        if (book) {
            await category.books.push(book._id)
            await category.save()
            res.json({
                code: 200,
                msg: '分类书籍添加成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '添加的书籍无效，该书籍不存在'
            })
        }
        
    } catch (err) {
        next(err)
    }
}

async function getBookOfCategory (req,res,next) {
    try {
        let {pn, size, bookSize} = req.query;
        pn = Number(pn)
        size = Number(size)
        bookSize = Number(bookSize)
        const data = await categoryModel.find()
            .sort({_id: -1})
            .populate({
                path: 'books', // books自己定义骨架中的键名
                options: {limit: bookSize}
            })
            .skip((pn-1) * size)
            .limit(size)
            .sort({_id: 1})

        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

async function getBookByCategory (req,res,next) {
    try {
        const {id} = req.params
        let {pn, size} =  req.query
        pn = Number(pn)
        size = Number(size)
        const data = await categoryModel.findById(mongoose.Types.ObjectId(id))
                    .populate({
                        path: 'books',
                        options: {limit: size,skip:(pn-1)*size}
                    })                  
        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}


module.exports = {
    addCategory,
    getCategory,
    addBookToCategory,
    getBookOfCategory,
    getBookByCategory
}