const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
    default: Date.now
  }
});

//export the model
const Response = mongoose.model('Response', responseSchema);
module.exports = { Response }; 