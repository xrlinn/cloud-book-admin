const collectionModel = require('../model/collection');
const mongoose = require('mongoose');
const userModel = require('../model/user')

async function addCollection (req,res,next) {
    try {
        const userId = req.user.userId;
        const {bookId} = req.body;
        const collection = await collectionModel.findOne({
            user: mongoose.Types.ObjectId(userId),
            book: mongoose.Types.ObjectId(bookId)
        })
        if (collection) {
            res.json({
                code: 400,
                msg: '对不起，您已经收藏过了哦'
            })
        } else {
            const collection = await collectionModel.create({
                user: mongoose.Types.ObjectId(userId),
                book: mongoose.Types.ObjectId(bookId)
            })
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {collected: 1}
            })
            res.json({
                code: 200,
                msg: '添加收藏成功'
            })
        }
   

    } catch (err) {
        next(err)
    }
}

async function getCollection (req,res,next) {
    try {
        const Id = req.user.userId
        let {pn=1, size=1} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await collectionModel
        .find({
            user: mongoose.Types.ObjectId(Id),
            status: 1
        })
        .populate({
            path: 'book'
        })
        .sort({_id: -1})
        .skip((pn-1) * size)
        .limit(size)

        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

async function deleteCollection (req,res,next) {
    try {
        const id = req.params.id

        const collection = await collectionModel.findById(
            mongoose.Types.ObjectId(id)
        )
        if (collection) {
            await collection.set({status: 0})
            await collection.save()
            res.json({
                code: 200,
                msg: '删除收藏成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '该书籍不存在或已删除'
            })

        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCollection,
    getCollection,
    deleteCollection
}