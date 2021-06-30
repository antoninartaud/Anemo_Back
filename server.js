const express = require('express');

const app = express();

const port = 8000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Anemo',
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
