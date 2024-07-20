const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//Post route to add a person
router.post('/',async (req, res) =>{
    try{
      const data = req.body //Assuming the request body contains the person data
    
      //Create a new person document using the Mongoose model
      const newPerson = new Person(data);
      
      //save the new persom to the database
      const response = await newPerson.save();
      console.log('data server');
      res.status(200).json(response);
    }
     catch(err){
        console.log(err);
        res.status(500).json({error: 'Interanl server Error'});
     } 
     
    })
    
    
    
//GET method to get the person
router.get('/', async (req, res) =>{
    try{
        const data= await Person.find();
        console.log('data fetched');
    res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Interanl server Error'});
    }
  })
      

router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType;  // extract the work type from the
        if(workType == 'chef' || workType == ' manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid worktype'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Invalid Server Error'});
    }
})

router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id; //Extract the id from the url parameter
        const updatedPersonData = req.body; //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
            new: true, //Return the updtaed document 
            runValidators: true, // Run Mongoose Validation
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
            res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Invalid Server Error'});
    }
})


router.delete('/:id', async(req, res)=>{
    try{
        const personId = req.params.id; //Extract the id from the url parameter

        const response = await Person.findByIdAndRemove(personId);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
            res.status(200).json({message: 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Invalid Server Error'});
    }
})

module.exports = router;