const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password } = req.body;
  const existedUser = await User.findOne({ username }).exec();
  if (existedUser) {
    // 409 Conflicts
    res.formatResponse(`${username} already exists`, 409);
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  await User.create({ username, password: hashedPassword });

  res.formatResponse({ username }, 201);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    // 401 Unauthorized
    res.formatResponse(`Incorrect username and password`, 401);
    return;
  }
  if (!(await bcrypt.compare(password, user.password))) {
    // 401 Unauthorized
    res.formatResponse(`Incorrect username and password`, 401);
    return;
  }
  res.formatResponse({ username });
};

module.exports = {
  register,
  login
};
