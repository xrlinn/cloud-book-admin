const mongoose = require('mongoose')

const book = new mongoose.Schema({
    title: String,
    img: String,
    author: String,
    desc: String,
    index: {
        type: Number,
        default: 1
    },
    looknums: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    type: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    },
    likenums: {
        type: Number,
        default: 0
    },
    length: {
        type: Number,
        default: 0
    }
},{versionKey: false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('book', book)