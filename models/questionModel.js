const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    deleted: { type: Boolean, default:false, required: true },
    created: { type: Date, default: Date.now }

})

const questionModel = mongoose.model("Question", questionSchema)

module.exports = questionModel;