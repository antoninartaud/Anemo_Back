const express = require('express');
const mongoose = require ("mongoose")


const {port, mongoURL}= require("./config")

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
      console.error(err);
  } else {
      console.log("I'm connected to the database")
  }
})


const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Anemo',
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
