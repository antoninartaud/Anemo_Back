const questionModel = require('../models/questionModel');

// ajouter une question
const addQuestion = async (req, res) => {
  try {
    const question = req.body;
    const questionAdded = await questionModel.create(question);
    res.json({
      message: 'question added',
      questionAdded,
    });
  } catch (error) {
    console.error('error', error);
    res.json({
      errorMessage: 'there is a problem',
    });
  }
};

// afficher les questions
const questionList = async (req, res) => {
  try {
    const questionList = await questionModel.find(
      { deleted: false },
      { questionText: 1 }
    );

    res.json({
      questionList,
      userId: req.user._id,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: 'there is a problem',
    });
  }
};

// utilitaire cette route n'est pas obligatoire
const getQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await questionModel.findById(
      { _id: id },
      { questionText: 1 }
    );
    res.json({
      message: 'ok route get/id',
      question,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: 'there is a problem on get/:id route',
    });
  }
};

// modifier la question
const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const newQuestionText = req.body.questionText;

    await questionModel.findByIdAndUpdate(
      { _id: id },
      { $set: { questionText: newQuestionText } }
    );
    res.json({
      message: 'ok route patch/id',
      newQuestionText,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: 'there is a problem on patch/:id route',
    });
  }
};

// Supprimer une question
const deletedQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedQuestion = await questionModel.findByIdAndUpdate(
      { _id: id },
      { $set: { deleted: true } }
    );
    res.json({
      message: 'la question a bien été effacer',
      deletedQuestion,
    });
  } catch (err) {
    console.error(err);
    res.json({
      message: 'pas reussi a delete',
    });
  }
};

module.exports = {
  addQuestion,
  deletedQuestion,
  updateQuestion,
  getQuestion,
  questionList,
};
