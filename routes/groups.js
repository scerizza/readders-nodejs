const express= require('express')
const router = express.Router();
const Group = require('../models/group');

// GET ALL GROUPS========================================

router.get('/', async (req, res)=>{

    try {
       
        const groups = await Group.find();

        res.status(200).json(groups);

    } catch (err) {
        res.status(500).json(err)        
    }
})

// GET GROUP INFO========================================

router.get('/:groupName', async (req, res)=>{

    try {    
        
        const groupName = req.params.groupName

        const group = await Group.find({
            "groupName": groupName
        });

        res.status(200).json(group);

    } catch (err) {
        res.status(500).json(err)        
    }
})

// NEW GROUP========================================

router.post('/', async (req, res)=>{

    try {
        const newGroup = Group({
            groupName: req.body.groupName,
            groupDescription: req.body.groupDescription,
            groupImgUrl: req.body.groupImgUrl,
            groupCoverImgUrl: req.body.groupCoverImgUrl,
        })


        const addedGroup = await newGroup.save();

        res.status(200).json(addedGroup);
        
    } catch(err){

        res.status(500).json(err)
    }
})

// DELETE GROUP ==================================================


router.delete('/', async (req, res)=>{

    try {    
        
        const groupName = req.body.groupName

        const group = await Group.deleteOne({
            "groupName": groupName
        });

        res.status(200).json(group);

    } catch (err) {
        res.status(500).json(err)        
    }
})


// UPLOAD GROUP ==========================================

router.patch('/:groupName', async (req, res)=>{

    try{

        const update = await Group.updateOne(
            {groupName: req.params.groupName},
            {$set:{
                    groupName: req.body.groupName,
                    groupDescription: req.body.groupDescription,
                    groupImgUrl: req.body.groupImgUrl,
                    groupCoverImgUrl: req.body.groupCoverImgUrl,
                }
            })
                
         res.status(200).json(update)       
        
    }catch(err){
        res.status(500).json({message: err})
    }
});


module.exports = router;