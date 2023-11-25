const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit', (req, res) => {
  const userInput = req.body.userInput;
  const htmlResponse = `<p>${userInput}</p>`;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
