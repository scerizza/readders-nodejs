const express= require('express')
const router = express.Router();

const Group = require('../models/group');
const User = require('../models/user');


// ADD FOLLOW BETWEEN USERS =================================================================

router.post('/user', async (req, res) => {

    try{
        
        const newFollow = await User.updateOne(
            {username: req.body.followerUsername},
            {$push: {follows: req.body.followedUsername}}
            )

        const newFollower =  await User.updateOne(
            {username: req.body.followedUsername},
            {$push: {followers: req.body.followerUsername}}
            )

        res.status(200).json(newFollow);

    }catch(err){

        res.status(500).json(err)
    }  
})

// DELETE FOLLOW BETWEEN USERS =================================================================

router.delete('/user', async (req, res)=>{

    try{

        const followerUsername = req.body.followerUsername
        const followedUsername = req.body.followedUsername
        
        const users = await User.updateOne(
            {username: followerUsername},
            {$pull:{ follows: followedUsername} }
        )

        await User.updateOne(
            {username: followedUsername},
            {$pull:{ followers: followerUsername} }
        )
        console.log("ok");
        
        res.status(200).json(users); // da sistemare!!!!
        

    }catch(err){

        res.status(500).json(err)
    }
})


//


// ADD FOLLOW HASHTAG =================================================================

router.post('/hashtag', async (req, res)=>{
    try{
        
        const newFollow = await User.updateOne(
            {username: req.body.followerUsername},
            {$push: {follows: req.body.hashtag}}
            )

        res.status(200).json(newFollow);
        

    }catch(err){

        res.status(500).json(err)
    }
})

// DELETE FOLLOW HASHTAG =================================================================

router.delete('/hashtag', async (req, res)=>{
    try{
        
        const deletion = await User.updateOne(
            {username: req.body.followerUsername},
            {$pull: {follows: req.body.hashtag}}
            )

        res.status(200).json(deletion);
        

    }catch(err){

        res.status(500).json(err)
    }
})





// ADD FOLLOW BETWEEN USER AND GROUP =================================

router.post('/group', async (req, res)=>{

    try{
        
        const newFollow = await User.updateOne(
            {username: req.body.followerUsername},
            {$push: {follows: req.body.groupName}}
            )
        
        const newFollower = await  Group.updateOne(
            {groupName: req.body.groupName},
            {$push: {followers: req.body.followerUsername}}
         );
        
        res.status(200).json(newFollow);

    }catch(err){

        res.status(500).json(err)
    }
    
})

// ADD DELETE BETWEEN USER AND GROUP =================================

router.delete('/group', async (req, res)=>{

    try{
        
        const deletion = await User.updateOne(
            {username: req.body.followerUsername},
            {$pull: {follows: req.body.groupName}}
            )
        
        const deletionFromGroup = await  Group.updateOne(
            {groupName: req.body.groupName},
            {$pull: {followers: req.body.followerUsername}}
         );
        
        res.status(200).json(deletion);

    }catch(err){

        res.status(500).json(err)
    }
    
})


module.exports = router;