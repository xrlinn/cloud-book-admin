const mongoose = require('mongoose')

const readList = new mongoose.Schema({
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    },
    title: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'title'
    },
    user: mongoose.SchemaTypes.ObjectId,
},{versionKey:false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('readList', readList)