const express = require('express');
const mongoose = require("mongoose");
const questionModel = require("./models/questionModel")


const { port, mongoURL } = require("./config")

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("I'm connected to the database")
  }
})


const app = express();
app.use(express.json())


// route view create question 
app.post('/', async (req, res) => {
  try {
    const question = req.body
    const questionAdded = await questionModel.create(question)
    res.json({
      message: 'question added',
      questionAdded

    })

  } catch (error) {
    console.error("error", error)
    res.json({
      errorMessage: "there is a problem"
    })
  }


})

// route view question : affiche liste question
app.get('/', async (req, res) => {
  try {
    const questionList = await questionModel.find({ deleted: false }, { questionText: 1 })
    res.json({
      questionList

    })
  } catch (error) {
    console.erro(error)
    res.json({
      message: "there is a problem"
    })
  }
});

// route view edit question : route modification question et enregistrement 

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id

    const question = await questionModel.findById({ _id: id }, { questionText: 1 })
    res.json({
      message: "ok route get/id",
      question
    })
  } catch (error) {
    console.error(error)
    res.json({
      message: "there is a problem on get/:id route"
    })
  }


})

// TODO req.body a la place de req.query
app.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const newQuestionText = req.body.questionText

    await questionModel.findByIdAndUpdate({ _id: id }, { $set: { questionText: newQuestionText } })
    res.json({
      message: "ok route patch/id",
      newQuestionText
    })
  } catch (error) {
    console.error(error)
    res.json({
      message: "there is a problem on patch/:id route"
    })
  }
})

// view delete question 
// TODO verifier avec leandro quel methode http utiliser route/delete ou /patch
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const deletedQuestion = await questionModel.findByIdAndUpdate({ _id: id }, { $set: { deleted: true } })
    res.json({
      message: "la question a bien été effacer",
      deletedQuestion
    })

  } catch (err) {
    console.error(err)
    res.json({
      message: "pas reussi a delete"
    })
  }



})



// TODO route * pour les erreur
app.get("*", (req, res) => {
  res.json({
    errorMessage: "The route was not found"
  }, 404)
});


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
