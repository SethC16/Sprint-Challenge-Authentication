const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets');
const Users = require('../jokes/jokes-model')

router.post('/register', (req, res) => {
  // implement registration
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 8);
  userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({username})
    .then(([user]) => {
      console.log(user);
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Hello ${user.username}`, token })
      } else {
        res.status(401).json({ message: 'invalid credentials given'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
