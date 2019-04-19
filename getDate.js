const jwt = require('jsonwebtoken')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTUwNjI3MzIsImRhdGEiOnsieHJsIjoiNjY2In0sImlhdCI6MTU1NTA2MjY3Mn0.ZxRBrLNRpivDWkqNDLq7fiITkerO-gTyUHmJxuE0xGs'

jwt.verify(token,'xrl',function(err,data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})