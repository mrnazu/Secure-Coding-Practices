const express = require('express');
const bodyParser = require('body-parser');
const { sanitize } = require('sanitize-html');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit', (req, res) => {
  const userInput = req.body.userInput;
  const sanitizedInput = sanitize(userInput, { allowedTags: [], allowedAttributes: {} });
  const htmlResponse = `<p>${sanitizedInput}</p>`;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
