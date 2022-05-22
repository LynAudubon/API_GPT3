// import app from '../../server/app.js';
// import supertest from 'supertest';
// import mongoose from 'mongoose';
// import Model from '../../server/models/ResponseModel.js';
import { jest } from '@jest/globals';

// describe('Response routes', () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//   });

//   afterAll(async (response) => {
//     await mongoose.disconnect();
//     await mongoose.connection.close();
//     await new Promise(resolve => setTimeout(() => resolve(), 10000));
  
//   });
//   describe('test route to OpenAI', () => {
//     jest.setTimeout(30000);
//     it('should return 200', async () => {
//       await supertest(app).get('/request/:info')
//         .expect(200);
//     });
//   });
 
//   describe('GET method on route to db', () => {
//   });
//   it('should return 200', async () => {
//     await supertest(app).get('/responses')
//       .expect(200)
//       .then((response) => {
//         expect(response.body.length).toBeGreaterThan(0);
          
//       });
//   });

//   describe('POST method on route db', () => {
    
//     it('should return 200', async () => {
//       const data = await Model.Response.create({
//         prompt: 'Write a prompt about a chicken',
//         response: 'Which came first the chicken or the egg?'
//       });
//       await supertest(app).post('/responses')
//         .send(data)
//         .expect(200)
//         .then((response) => {
//           expect(response.body._id).toBeTruthy();
//           expect(response.body.prompt).toBe(data.prompt);
//           expect(response.body.response).toBe(data.response);
//         })
//         .catch(err => console.log('error', err));
//     });
//   });
// });
import app from '../../server/app.js';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Model from '../../server/models/ResponseModel.js';

describe('Response routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await new Promise(resolve => setTimeout(() => resolve(), 10000));
  });

  describe('test route to OpenAI', () => {
    jest.setTimeout(30000);
    it('should return 200', async () => {
      await supertest(app).get('/request/:info')
        .expect(200);
    });
  });
 
  describe('GET method on route to db', () => {
    jest.setTimeout(30000);
  });
  it('should return 200', async () => {
    await supertest(app).get('/responses')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBeGreaterThan(0); 
      });
  });

  describe('POST method on route db', () => {
    jest.setTimeout(30000);
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
    it('should return message deleted', async () => {
      jest.setTimeout(30000);
      const lastInserted = await Model.Response.find({}).sort({_id:-1}).limit(1);
      console.log('last', lastInserted[0]._id);

      const event = { 
        target: {
          id: lastInserted[0]._id
        }
      };
      await supertest(app).delete('/responses')
        .send(event)
        .then(async (response) => {
          // console.log('message', response.body.message)
          expect(response.body.message).toBe('Message was successfully deleted');
        })
        .catch(err => console.log('error', err));
    });
  });
});