const mongoose = require('mongoose');
// TODO email unique 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 },
  responseId: [{ type: mongoose.Types.ObjectId, ref: 'responses' }],
  created: { type: Date, default: Date.now },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
