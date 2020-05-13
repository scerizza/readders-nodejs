const express= require('express')
const router = express.Router();

const Group = require('../models/group');
const User = require('../models/user');


// ADD FOLLOW BETWEEN USERS =================================================================

router.post('/user', async (req, res) => {

    try{
        
        const newFollow = await User.updateOne(
            {username: req.body.followerUsername},
            {$push: {follows: req.body.followUsername}}
            )

        const newFollower =  await User.updateOne(
            {username: req.body.followUsername},
            {$push: {followers: req.body.followerUsername}}
            )

        res.status(200).json(newFollow);

    }catch(err){

        res.status(500).json(err)
    }  
})


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

module.exports = router;