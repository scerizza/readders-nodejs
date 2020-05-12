const express= require('express')
const router = express.Router();
const Post = require('../models/post');


// GET ALL POSTS================================================================
router.get('/', async (req, res)=>{

    try{
        const posts= await Post.find();
        res.status(200).json(posts)

    }catch(err){
        res.status(500).json({message: err})
    }
});


// GET POST FROM USER============================================================
router.get('/:username', async (req, res)=>{

    const username = req.params.username

    try{
        const posts= await Post.find(
            {
                "username" : username
            }
        );
        res.status(200).json(posts)

    }catch(err){
        res.status(500).json({message: err})
    }
});


// SUBMIT A POST=================================================================
router.post('/', async (req, res)=>{

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        username: req.body.username,
        imageUrl: req.body.imageUrl
    })

    try{
        const savedPost = await post.save()
        res.status(200).json(savedPost)

    }catch(err){
      
        res.status(500).json({message: err})
    }
});


// DELETE A POST============================================================

router.delete('/:postId', async (req, res)=>{

    try{
        const deletion= await Post.deleteOne({"_id": req.params.postId})
        res.status(200).json(deletion)

    }catch(err){
        res.status(500).json({message: err})
    }
});


// UPDATE POST==============================================================

router.patch('/:postId', async (req, res)=>{

    try{

        const postId = req.params.postId

        const update= await Post.updateOne(
            {_id: postId},
            {$set:{
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl
            }})

        res.status(200).json(update)

    }catch(err){
        res.status(500).json({message: err})
    }
});










/*
!!!!!!!!!!!!!!!!!!!!!!!!!!
        COMMENTS
!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


// ADD COMMENT ======================================

router.post('/:postId/comment', async (req, res)=>{

    try{

        const postId = req.params.postId

        const update= await Post.updateOne(
            {_id: postId},
            {$push:{
                comments: {
                    text : req.body.text,
                    username: req.body.username 
                }
            }})

        res.status(200).json(update)

    }catch(err){
        res.status(500).json({message: err})
    }
});


// DELETE COMMENT ======================================

router.delete('/:postId/comment/:commentId', async (req, res)=>{

    try{

        const postId = req.params.postId
        const commentId = req.params.commentId
       
        const deletion= await Post.updateOne(
            {_id: postId},
            {$pull:{comments: {
                    _id : commentId,
                  }
            }})
            
        res.status(200).json(deletion)

    }catch(err){
        res.status(500).json({message: err})
    }
});


// UPDATE COMMENT ======================================

router.patch('/:postId/comment/:commentId', async (req, res)=>{

    try{

        const postId = req.params.postId
        const commentId = req.params.commentId

        const update= await Post.updateOne(
            {_id: postId, "comments._id" : commentId},
            {$set:{
                "comments.$.text": req.body.text
            }})

        res.status(200).json(updatecl)

    }catch(err){
        res.status(500).json({message: err})
    }
});







/*
!!!!!!!!!!!!!!!!!!!!!!!!!!
        REACTIONS
!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

// ADD REACTION ======================================

router.post('/:postId/reaction', async (req, res)=>{

    try{

        const postId = req.params.postId

        const update= await Post.updateOne(
            {_id: postId},
            {$push:{
                reactions: {
                    type : req.body.type,
                    username: req.body.username 
                }
            }})

        res.status(200).json(update)

    }catch(err){
        res.status(500).json({message: err})
    }
});


// DELETE REACTION ======================================

router.delete('/:postId/reaction/:username', async (req, res)=>{

    try{

        const postId = req.params.postId
        const username = req.params.username
       
        const deletion= await Post.updateOne(
            {_id: postId},
            {$pull:{reactions: {
                    username : username,
                  }
            }})
            
        res.status(200).json(deletion)

    }catch(err){
        res.status(500).json({message: err})
    }
});

// CHANGE REACTION ======================================

router.patch('/:postId/reaction/:username', async (req, res)=>{

    try{

        const postId = req.params.postId
        const username = req.params.username

        const update= await Post.updateOne(
            {_id: postId, "reactions.username" : username},
            {$set:{
                "reactions.$.type": req.body.type
            }})

        res.status(200).json(update)

    }catch(err){
        res.status(500).json({message: err})
    }
});


module.exports = router;