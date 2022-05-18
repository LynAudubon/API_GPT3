import Model from '../models/ResponseModel.js';
import { ObjectId } from 'mongodb';

const postResponse = async function(req, res, next){
  console.log('control',req.body.response.choices[0].text);
  try{
    const postNewResponse = new Model.Response({
      prompt: req.body.prompt,
      response: req.body.response.choices[0].text,
    });

    if (!postNewResponse.prompt && !postNewResponse.response) {
      return res.status(406).json('No response available OR enter more suitable prompt');
    }else{
      // console.log(postNewResponse);
      await postNewResponse.save();
      return next();
    }
  }catch(error){
    res.status(400).json({ message: error.message });//??????
  }
};

const getResponses = function(req,res,next){
  try{
    Model.Response.find({}, (err, responses) => {
      if(err) return next('Error in getResponses: ' + err);
      res.status(200).json(responses);
    });
  }catch(error){
    return next(error);
  }
};

const deleteResponse = async function(req,res,next){
  const id = new ObjectId(req.body.id);
  try{
    await Model.Response.findByIdAndRemove(id);
    res.json({message: 'Message was successfully deleted'
    });
  }catch(error){
    // console.log({message: error.message});
    return next(error);
  }
};

export default {
  postResponse,
  getResponses,
  deleteResponse
};
