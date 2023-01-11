const jwt = require("jsonwebtoken");

exports.verifyToken = function (req, res, next) {
  const token = req.header("Authorization");
  //   const token = req.cookies.access_token;
  console.log("BE - verifyToken:", token);
  if (!token) {
    return res.status(401).json("You are not authentication");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json("Token is invalid!");
    req.user = user;
    console.log({ userReqToken: req.user });
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authorized!");
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authorized!");
    }
  });
};
