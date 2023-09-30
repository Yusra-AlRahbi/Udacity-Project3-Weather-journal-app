// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port,()=>{
    console.log('server is running on port ' + port );
});

//Callback function to complete POST request
const postData = async(req,res) =>{
    projectData = await req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
// POST Route
app.post("/addData",postData);

//Callback function to complete GET request 
const getAllData = async(req,res) => {
    await res.status(200).send(projectData)
};
//GET Route
app.get("/allData",getAllData);