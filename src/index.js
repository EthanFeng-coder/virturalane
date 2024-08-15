const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const store = require('./store');


const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
const app = express();
const JWT_SECRET = process.env.JWT_SECRET;  // Replace with your actual secret

app.use(express.static('public'));
app.use(bodyParser.json());

// Create User Route
app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err.message));
});

// Login Route
app.post('/login', (req, res) => {
  store
    .login({
      username: req.body.username,
      password: req.body.password
    })
    .then((user) => {
      // Generate a JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    })
    .catch((err) => res.status(401).send(err.message));
});

// Middleware for verifying JWT tokens
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token.');
    }
    req.user = decoded; // Add the decoded token data to the request object
    next();
  });
}

// Protected Route Example
app.get('/protected', verifyToken, (req, res) => {
  // Access req.user here to get user details
  res.send(`Hello ${req.user.username}, this is a protected route!`);
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
