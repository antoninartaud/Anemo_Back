const questionModel = require('../models/questionModel');

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
