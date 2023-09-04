const Session = require("../models/session.model");

module.exports = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization !== "null") {
    return Session.findById(req.headers.authorization).then((session) => {
      if (session) {
        return res.status(401).json({
          errorMessage: "Must be logged out to make this request.",
        });
      }
      return next();
    });
  }

  next();
};
