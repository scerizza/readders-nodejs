const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({

    isbn: {type: String, required:true},
    title: {type: String, required:true},
    description: {type: String, required:true},
    coverImgUrl: {type: String},
    backImgUrl: {type: String},
    kind:{type: String, required:true},
    reviews: [{
        username: { type: String, required: true},
        rate:{type : Number, required: true},
        text: {type: String}
    }],
    readers: [{
        username: { type: String, required: true}
    }]
})

express.exports = mongoose.model('Books', BookSchema);