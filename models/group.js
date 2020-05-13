const mongoose = require('mongoose')

const GroupSchema= mongoose.Schema({
    groupName : {type: String, required: true},
    groupDescription: {type: String, required: true},
    followers: {type: [{
        username: { type: String, required: true},
        profileImgUrl: {type: String},
    }]},
    admins: {type: [{username: String}]},
    groupImgUrl: {type: String},
    groupCoverImgUrl: {type: String}
})

module.exports = mongoose.model('Groups', GroupSchema);
