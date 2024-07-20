const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/',async (req, res) =>{
    try{
      const data = req.body //Assuming the request body contains the person data
    
      //Create a new person document using the Mongoose model
      const newMenu = new MenuItem(data);
      
      //save the new persom to the database
      const response = await newMenu.save();
      console.log('data server');
      res.status(200).json(response);
    }
     catch(err){
        console.log(err);
        res.status(500).json({error: 'Interanl server Error'});
     } 
     
    })
  
  //GET method to get the menu
  router.get('/', async (req, res) =>{
    try{
        const data= await MenuItem.find();
        console.log('data fetched');
    res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Interanl server Error'});
    }
  }) 

  router.get('/:tasteType', async(req, res)=>{
    try{
        const tasteType = req.params.tasteType;  // extract the work type from the
        if(tasteType == 'sweet' || tasteType == ' spicy' || tasteType == 'sour'){
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid tastetype'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Invalid Server Error'});
    }
})

//comment added for testing porpose
  module.exports = router;