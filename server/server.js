//create api
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3333;

//connect to database
const connectDB = require('./models/db');
const mongoose = require('mongoose');
connectDB();

//
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

//acquire static files
app.use(express.static(path.resolve(__dirname, '../assets/')));

//serve html file to browser
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/index.html'));
});

//import middlewares
const responseController = require('./contollers/responseController.js');

//Routes to middleware
app.get('/responses', responseController.getResponses, (req, res, err) => {
  if(err) console.log('Error in getResponses', err);
});

app.post('/responses', responseController.postResponse, (req, res) => {
  return res.status(200).send('New response posted');
});


/**
 * 404 handler
 */
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});
  
/**
   * Global error handler
   */
app.use((error, req, res, next) => {
  res.status(500).send(`Internal Server Error: ${error}`);
});
  
//run server locally and listen for connections
app.listen(PORT, () => console.log('Server running on...', PORT));