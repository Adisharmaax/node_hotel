const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body

const PORT = process.env.PORT || 3000;

const MenuItem = require('./models/MenuItem');

app.get('/', function (req, res) {
  res.send('Hello World')
})

//optional tha
app.get('/string',  (req, res) => {
    
    var list={
        name: 'aditya',
        agr: '21',
        eat:true, 
        drink:false
    }
    res.send(list)
  })





//import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person' , personRoutes);
app.use('/menu' , menuItemRoutes);



app.listen(PORT, ()=>{
  console.log('listening on port 3000');
})