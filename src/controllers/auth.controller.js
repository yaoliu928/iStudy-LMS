const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const getLogger = require('../common/logger');
const { generateToken } = require('../common/utils/jwt');

const logger = getLogger(__filename);

const register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const existedUser = await User.findOne({ username }).exec();
    if (existedUser) {
      // 409 Conflicts
      res.formatResponse(`${username} already exists`, 409);
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword, role });

    res.formatResponse(user, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
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
    const token = generateToken({ sub: user.id, username: user.username, role: user.role });
    res.formatResponse({ username, token });
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  register,
  login
};
