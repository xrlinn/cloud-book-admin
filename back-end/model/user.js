const mongoose = require('mongoose')

const user = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'http://pbl.yaojunrong.com/FjTqJ40f94QfgeliPRF_-9g4ly3Q'
    },
    collected: {
        type: Number,
        default: 0
    },
    desc: String,
    phone: {
        type: Number,
        unique: true
    },
    password: String,
    usernickname: String,
    read: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    }
},{versionKey:false, timestamps: {createdAt: 'createTime',
 updatedAt: 'updateTime'}})

module.exports = mongoose.model('user', user)