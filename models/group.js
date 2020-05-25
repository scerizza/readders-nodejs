const mongoose = require('mongoose')

const GroupSchema = mongoose.Schema({
    groupName : {type: String, required: true},
    groupDescription: {type: String, required: true},
    followers: [],
    admins: [{
        username: {type: String}
    }   
    ],
    groupImgUrl: {type: String},
    groupCoverImgUrl: {type: String},
    fideltyLibraryCode: {type: String},
    posts: [],
    calendar: [
        {
            month: {type: String},
            bookTitle: {type: String},
            bookIsbn: {type: String},
            bookAuthor: {type: String},
            status: {type: String},
            topic: {type: String},
        }
    ] ,
    messages: {

    }
})

module.exports = mongoose.model('Groups', GroupSchema);
