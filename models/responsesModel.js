const mongoose = require('mongoose');

// TODO vérification responseModel
const responseSchema = new mongoose.Schema({
  responseValue: { type: Number, required: true },
  questionId: [{ type: mongoose.Types.ObjectId, ref: 'questions' }],
  userId: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  created: { type: Date, default: Date.now },
});

const responseModel = mongoose.model('Response', responseSchema);

module.exports = responseModel;
