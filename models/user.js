const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: { type: String, require: true},
    fullName: { type: String, require: true},
    birthday: { type: String},
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1},
    bio: { type:String},
    vip: { type: Boolean}, 
    cognitoCode: { type:String, require: true},
    profilePictureUrl: { type:String},
    follows: [],
    followers: [],
    groups: { type:Array},
    readBooks: {type: Array},
    wishlist: {type:Array},
    swaplist: {type: Array}
});

module.exports = mongoose.model('User', UserSchema);
