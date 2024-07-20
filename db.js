const mongoose = require('mongoose');
require('dotenv').config();

//define the mongoDb connection URL
const mongoURL = 'mongodb://localhost:27017' //Replace 'mydatabase' with your database name

//Set up MongoDb connection
mongoose.connect(mongoURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//write from chatgpt doing same thing that is written in the below

.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error: ', err));
//Get the default connecvtion
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//define event listening for database connection
 db.on('connected', () =>{
    console.log('Connected to MonngoDB server');
 });

 db.on('error', () =>{
    console.log('MonngoDB Connection error:', error);
 });

 db.on('disconnected', () =>{
    console.log('MonngoDB disconnected ');
 });

 module.exports = db;