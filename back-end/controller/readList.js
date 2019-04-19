const readListModel = require('../model/readlist')
const mongoose = require('mongoose')

async function getReadList (req,res,next) {
    try {
        const userId = req.user.userId
        const readlistData = await readListModel.find({
            user: mongoose.Types.ObjectId(userId)
        }).populate({
            path: 'title'
        }).populate('book')
        res.json({
            code: 200,
            data: readlistData
        })

    } catch (err) {
        next()
    }
}

module.exports = {
    getReadList
}