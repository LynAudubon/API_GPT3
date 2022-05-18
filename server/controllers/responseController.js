import Model from '../models/ResponseModel.js';

const postResponse = async function(req, res, next){
  console.log(req.body);
  try{
    const postNewResponse = new Model.Response({
      prompt: req.body.prompt,
      response: req.body.response,
    });
d
    if (!postNewResponse.prompt && !postNewResponse.response) {
      return res.status(406).json('No response and/ or prompt');
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

export default {
  postResponse,
  getResponses
};
