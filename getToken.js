const jwt = require('jsonwebtoken')

const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (300),
    data: {
        xrl: "666"
    }
},'xrl')

console.log(token)