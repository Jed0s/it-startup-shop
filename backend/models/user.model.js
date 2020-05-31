const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
    username: {
        type: String,
        maxlength: 50
    },
    password: {
        type: String,
        maxlength: 100
    },
    userKey: {
        type: String
    },
    role: {
        type: String
    }
})

mongoose.model('User', userSchema);