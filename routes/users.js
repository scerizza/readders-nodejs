const express= require('express')
const route = express.Router();
const User = require('../models/user');


// GET ALL USERS========================================
route.get('/', async (req, res)=>{

    try{
        const users = await User.find()
        res.status(200).json(users);

    }catch(err){

        res.status(500).json(err)
    }

})

// GET USER PROFILE=======================================
route.get('/:username', async (req, res)=>{

    try{

        const user = await User.find({
            "username" : req.params.username
        })
        res.status(200).json(user);

    }catch(err){

        res.status(500).json(err)
    }
})



//CREATE NEW USER=========================================
route.post('/', async (req, res) => {

    const user = new User({ 
        username: req.body.username,
        fullName: req.body.fullName,
        birthday: req.body.birthday,
        points: req.body.points,
        level: req.body.level,
        bio: req.body.bio,
        cognitoCode: req.body.cognitoCode,
        profilePictureurl: req.body.profilePictureUrl
        })

    try{

        const createdUser = await user.save()
        res.status(200).json(createdUser)
        }

    catch(err){

        res.status(500).json(err)
    }
})

// DELETE USER ==========================================

route.delete('/:username', async (req, res)=>{

    try{
        const deletion= await User.remove({"username": req.params.username})
        res.status(200).json(deletion)

    }catch(err){
        res.status(500).json({message: err})
    }
});


// UPLOAD USER ==========================================

route.patch('/:username', async (req, res)=>{

    try{

        const update = await User.updateOne(
            {username: req.body.username},
            {$set:{
                    fullName: req.body.fullName,
                    birthday: req.body.birthday,
                    points: req.body.points,
                    level: req.body.level,
                    bio: req.body.bio,
                    profilePictureUrl: req.body.profilePictureUrl,
                }
            })
                
         res.status(200).json(update)       
        
    }catch(err){
        res.status(500).json({message: err})
    }
});


// ADD USER FOLLOW=======================================
route.post('/:username/follow', async (req, res)=>{

    try{
        
        const users = await User.updateOne(
            {username: req.params.username},
            {$push: {follows: req.body.followUsername}}
            )

        res.status(200).json(users); // da sistemare!!!!
        

    }catch(err){

        res.status(500).json(err)
    }
})



// DELETE USER FOLLOW  =================================

route.delete('/:username/follow', async (req, res)=>{

    try{

        const followUsername = req.body.followUsername
        
        const users = await User.updateOne(
            {username: req.params.username},
            {$pull:{ follows: followUsername} }
        )
        res.status(200).json(users); // da sistemare!!!!
        

    }catch(err){

        res.status(500).json(err)
    }
})


module.exports = route;