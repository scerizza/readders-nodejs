const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: { type:String, required:true},
    description: { type:String, required:true},
    username: {type:String},
    date: {type: Date, default: Date.now},
    imgUrl: {type:String},
    comments: [{
        text: {type:String, required:true},
        date: {type:Date, default: Date.now},
        username: {type:String}
    }],
    reactions: [{
        username: {type:String, required:true, unique:true },
        type: {type:String, default: "like"}
    }]
});

module.exports = mongoose.model('Posts', PostSchema);

