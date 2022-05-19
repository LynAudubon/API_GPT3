//create api
// const express = require('express');
// const path = require('path');
// const cors = require('cors');
import express from 'express';

import fetch from 'node-fetch';
// import cors from 'cors';

//steps to import using __dirname in ES module
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initialize the express method
//initialize port
import 'dotenv/config';
const app = express();

//connect to database
import connectDB from './models/db.js';
// import mongoose from 'mongoose';
connectDB();

//parse data
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true}));
// app.use(cors());

//acquire static files
app.use(express.static(path.resolve(__dirname, '../assets/')));

//serve html file to browser
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/index.html'));
});

//import middlewares
import responseController from './controllers/responseController.js';

//Routes to middleware
app.get('/responses', responseController.getResponses, (req, res, err) => {
  if(err) console.log('Error in getResponses', err);
});

app.get('/request/:info', async (req, res) => {
  const api_url = 'https://api.openai.com/v1/engines/text-curie-001/completions';

  const data = req.params.info;
  console.log('param',data);

  ///if data.prompt is null?????
  const fetch_response = await fetch(api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.parse(JSON.stringify(data)),
  });
  const json = await fetch_response.json();
  res.json(json);
});

app.post('/responses', responseController.postResponse, (req, res, err) => {
  if(err) console.log(err);
  return res.status(200).send('New response posted');
});

app.delete('/responses', responseController.deleteResponse, (req,res,err) => {
  if(err) console.log('delete', err);
  return res.status(200);
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

export default app;