const express = require('express');
const bodyParser = require('body-parser');

const store = require('./store');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err.message));
});

app.post('/login', (req, res) => {
  store
    .login({
      username: req.body.username,
      password: req.body.password
    })
    .then((user) => res.status(200).send('Login successful'))
    .catch((err) => res.status(401).send(err.message));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
