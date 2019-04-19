const articleModel = require('../model/article')
const mongoose = require('mongoose')
const readListModel = require('../model/readlist')
const userModel = require('../model/user')
const bookModel = require('../model/book')
const jwt = require('jsonwebtoken');

function verifyToken (token) {
    return new Promise ((resolve,reject) => {
        jwt.verify(token, 'xrl', (err,data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data.data)
        })
    })
}

async function getArticleById (req,res,next) {
    try {
        const token = req.headers.token || req.body.token || req.query.token;
        const {id} = req.params;
        const data = await articleModel.findOne({
            titleId: mongoose.Types.ObjectId(id)
        })
        if (token) {
            const userData = await verifyToken(token);
            if (userData) {
                req.user = userData;
                const userId = req.user.userId
                const user = await readListModel.findOne({
                    user: mongoose.Types.ObjectId(userId),
                    book: mongoose.Types.ObjectId(data.bookId)
                } )
                if (user) {
                     await readListModel.update({ book: mongoose.Types.ObjectId(data.bookId)},
                    {
                        title: mongoose.Types.ObjectId(id),
                        book: mongoose.Types.ObjectId(data.bookId),
                        user: mongoose.Types.ObjectId(userId)
                    })

                } else {
                    await readListModel.create({
                       title: mongoose.Types.ObjectId(id),
                       book: mongoose.Types.ObjectId(data.bookId),
                       user: mongoose.Types.ObjectId(userId)
                    })
                    await userModel.update({_id:mongoose.Types.ObjectId(userId)},
                    {
                        $inc: {read: 1}
                    })
                }
            }
        }
        await bookModel.update({_id:mongoose.Types.ObjectId(data.bookId)},
                    {
                        $inc: {looknums: 1}
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
    getArticleById
}