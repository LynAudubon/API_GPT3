import request from 'supertest';
import express from 'express';

const app = express();

app.get('/responses',function(req,res){
  res.status(200).json({
    prompt: 'Write a prompt about a chicken',
    response: 'The chicken pecks all day'
  });
});