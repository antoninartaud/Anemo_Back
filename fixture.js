const mongoose = require('mongoose');
const questionModel = require('./models/questionModel');
const userModel = require("./models/userModel")
const { mongoURL } = require('./config');
const bcryptjs = require("bcryptjs")

mongoose.connect(
  mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("I'm connected to the database");
    }
  }
);

const addQuestions = async () => {
  try {
    await questionModel.deleteMany({});

    const questions = await questionModel.insertMany([
      {
        questionText:
          'Je suis convaincu∙e de pouvoir gérer le stress associé au fait d’interagir avec des personnes venant de cultures que je ne connais pas.',
        deleted: false,
      },

      {
        questionText:
          'Je suis certain∙e de pouvoir socialiser avec des personnes venant de cultures qui ne me sont pas familières.',
        deleted: false,
      },

      {
        questionText:
          'Avant d’interagir avec des personnes d’une autre culture, je me demande quels sont mes objectifs.',
        deleted: false,
      },

      {
        questionText:
          'Je peux décrire comment les conceptions de la beauté et de l’esthétique diffèrent entre les cultures.',
        deleted: false,
      },

      {
        questionText:
          "J'aime beaucoup interagir avec des personnes venant de cultures différentes.",
        deleted: false,
      },

      {
        questionText:
          'Je modifie la façon dont j’accueille les autres(poignée de main, hochement de tête, ...) selon le contexte culturel.',
        deleted: false,
      },

      {
        questionText:
          'Je peux décrire les valeurs culturelles fondamentales expliquant les différences de comportements à travers le monde.',
        deleted: false,
      },

      {
        questionText:
          'Je fais attention à la façon d’exprimer mon désaccord selon la culture de mes interlocuteurs.',
        deleted: false,
      },

      {
        questionText:
          'J’adapte ma communication verbale(accent, ton, débit, …) pour m’ajuster au contexte culturel.',
        deleted: false,
      },

      {
        questionText:
          'Je prête attention à la façon dont les aspects culturels peuvent influencer une situation.',
        deleted: false,
      },
    ]);

    // console.log(questions);
  } catch (error) {
    console.error(error);
  }
};

addQuestions();

const displayQuestions = async () => {
  try {
    const questions = await questionModel.find({});

    console.log('questions', questions);
    // console.log('questions 1st', questions[1]);
  } catch (error) {
    console.log(error);
  }
};

// displayQuestions();

const addAdmin = async () => {
  try {
    await userModel.deleteMany({});

    const passwordHashed = bcryptjs.hashSync("Anemo1")

    const questions = await userModel.insertMany([
      {
        name: "Juan",
        email: "contact@anemo-cq.fr",
        password: passwordHashed,
        role: 1
      }
    ])

  } catch (error) {
    console.error(error)
  }
}

// addAdmin()


