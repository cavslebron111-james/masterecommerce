const { User1 } = require('../models/User1.js');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;

  User1.findByToken(token, (err, user1) => {
    if (err) throw err;
    if (!user1)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user1 = user1;
    next();
  });
};

module.exports = { auth };
