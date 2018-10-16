const User = require('../models/userModel');

const createUser = (req, res) => {
  const { name } = req.body;
  if (name) {
    const newUser = new User({ name });
    newUser.save()
      .then((user) => {
        res.status(200).send({ 'user successfully registered': user });
      })
      .catch(err => res.status(422).send(err));
  } else {
    res.status(422).send('Please send a name');
  }
};

module.exports = {
  createUser,
};
