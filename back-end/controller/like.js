const likeModel = require('../model/like');
const mongoose = require('mongoose');
const userModel = require('../model/user')

async function addLike (req,res,next) {
    try {
        const userId = req.user.userId;
        const {bookId} = req.body;
        const like = await likeModel.findOne({
            user: mongoose.Types.ObjectId(userId),
            book: mongoose.Types.ObjectId(bookId)
        })
        if (like) {
            res.json({
                code: 400,
                msg: '对不起，您已经喜欢过了哦'
            })
        } else {
            const like = await likeModel.create({
                user: mongoose.Types.ObjectId(userId),
                book: mongoose.Types.ObjectId(bookId)
            })
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {like: 1}
            })
            res.json({
                code: 200,
                msg: '添加喜欢成功'
            })
        }
   

    } catch (err) {
        next(err)
    }
}

async function getLike (req,res,next) {
    try {
        const Id = req.user.userId
        let {pn=1, size=1} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await likeModel
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

async function deleteLike (req,res,next) {
    try {
        const id = req.params.id
        const userId = req.user.userId;
        const like = await likeModel.findById(
            mongoose.Types.ObjectId(id)
        )
        if (like) {
            await like.remove()
            await like.save()
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},{
                $inc: {like: -1}
            })
            res.json({
                code: 200,
                msg: '删除喜欢成功'
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
    addLike,
    getLike,
    deleteLike
}