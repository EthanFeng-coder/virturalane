const knex = require('knex')(require('./knexfile'));
const bcrypt = require('bcrypt');

module.exports = {
  createUser({ username, password }) {
    console.log(`Add user ${username} with password ${password}`);
    return bcrypt.hash(password, 10).then((hashedPassword) => {
      return knex('user').insert({
        username,
        password: hashedPassword,
      });
    });
  },

  login({ username, password }) {
    console.log(`Login attempt for user ${username}`);
    return knex('user')
      .where({ username })
      .first()
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        }
        return bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            throw new Error('Invalid password');
          }
          return user; // Successful login, return user info (omit sensitive data)
        });
      });
  },
};
