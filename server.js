const express = require('express');
const mongoose = require("mongoose");
const questionRoutes = require("./routes/questionRoutes")
const authRoutes = require("./routes/authRoutes")
const reponsesRoute=require("./routes/responseRoute")
const cors = require("cors")


const { port, mongoURL } = require("./config");
const responseModel = require('./models/responsesModel');

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("I'm connected to the database")
  }
})


const app = express();
app.use(cors())
app.use(express.json())


app.use("/admin", questionRoutes)
app.use("/signup", authRoutes)
app.use("/response",reponsesRoute)





app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
