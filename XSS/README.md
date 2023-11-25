# XSS In Nutshell
XSS is a type of security vulnerability that occurs when an attacker/hunter :) injects evil `js` into web maybe via userinput. These scripts are then executed in the context of the victim's browser, allowing the attacker to steal information, manipulate the appearance of a website, or perform other malicious actions.

XSS is caused by inadequate validation and sanitization of user input in web. When input from users is not properly filtered or sanitized before being displayed, an attacker can inject scripts that get executed by other users' browsers.

Attackers inject malicious code, typically `JavaScript`, into web applications through user inputs like i said above, such as `form fields`, `URL parameters`, or even `HTTP headers`. When the application doesn't properly validate or sanitize this input, the malicious code gets stored and later executed by other users' browsers.

### Now navigate to: `Buggy_Node.js`

```javascript
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

```
- The code takes user input from req.body.userInput without proper validation or sanitization.
- It directly injects the user input into an HTML response without encoding it, making it susceptible to XSS attacks.

### Now navigate to: `Secured_Node.js`

```javascript
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
```

- Input Validation:
  - Use the `sanitize-html` library to sanitize the user input. In this example, we're allowing only plain text by specifying `allowedTags: []` and `allowedAttributes: {}`.
- Output Encoding:
  - By using the `sanitize` function, the user input is properly sanitized before being injected into the HTML response. This prevents any malicious script from being executed.
- Sanitization Library:
  - In a real-world scenario, you would likely use a more comprehensive sanitization library. `sanitize-html` is a simple example, but depending on your needs, you might choose a more sophisticated library.

---

### Buggy HTML form and a vulnerable Node.js server-side script

`Buggy_HTML_Form.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsafe Form</title>
</head>
<body>
  <form action="http://localhost:3000/submit" method="POST">
    <label for="userInput">Enter your name:</label>
    <input type="text" id="userInput" name="userInput">
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```
`Buggy_Node.js_Server_Script.js`:

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/submit', (req, res) => {
  const userInput = req.body.userInput;
  const htmlResponse = `<p>Hello, ${userInput}!</p>`;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```
