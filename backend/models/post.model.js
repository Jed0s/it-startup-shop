const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
        type: String
    },
    shortDescription: {
        type: String
    },
    fullDescription: {
        type: String
    },
    cityCenter: {
        type: String
    },
    requestedMoney: {
        type: Number
    },
    date: {
        type: String
    }
});
mongoose.model('Post', postSchema);