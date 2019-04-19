const titleModel = require('../model/title')
const mongoose = require('mongoose')

async function getTitle (req, res, next) {
    try {
        const {id} = req.params;
        const data = await titleModel.find({
            bookId: mongoose.Types.ObjectId(id)
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
    getTitle
}