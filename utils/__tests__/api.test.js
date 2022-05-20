import app from '../../server/app.js';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Model from '../../server/models/ResponseModel.js';

describe('Response routes', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('test route to OpenAI', () => {
    it('should return 200', async () => {
      await supertest(app).get('/request/:info').expect(200);
    });
  });
 
  describe('GET method on route to db', () => {
  });
  it('should return 200', async () => {
    await supertest(app).get('/responses').expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThan(0);
          
      });
  });

  describe('POST method on route db', () => {
    
    it('should return 200', async () => {
      const data = await Model.Response.create({
        prompt: 'Write a prompt about a chicken',
        response: 'Which came first the chicken or the egg?'
      });
      await supertest(app).post('/responses')
        .send(data)
        .expect(200)
        .then((response) => {
          expect(response.body._id).toBeTruthy();
          expect(response.body.prompt).toBe(data.prompt);
          expect(response.body.response).toBe(data.response);
        })
        .catch(err => console.log('error', err));
    });
  });
});