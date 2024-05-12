const User = require('../models/user.model');

const register = async (req, res) => {
  const { username, password } = req.body;
  const existedUser = await User.findOne({ username }).exec();
  if (existedUser) {
    // 409 Conflicts
    res.formatResponse(`${username} already exists`, 409);
    return;
  }
  const user = await User.create({ username, password });
  res.formatResponse(user, 201);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    // 401 Unauthorized
    res.formatResponse(`Incorrect username and password`, 401);
    return;
  }
  if (user.password !== password) {
    // 401 Unauthorized
    res.formatResponse(`Incorrect username and password`, 401);
    return;
  }
  res.formatResponse(user);
};

module.exports = {
  register,
  login
};
