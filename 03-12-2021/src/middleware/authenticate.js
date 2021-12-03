require("dotenv").config();
const jwt = require("jsonwebtoken");

let verifyToken = (token) => {
  console.log('called')
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, function (err, token) {
      console.log(token)
      if (err) return reject(err);
      return resolve(token);
    });
  });
};

module.exports = async(req, res, next) => {
  const bearerToken = req?.headers?.authorization;
  if (!bearerToken || !bearerToken.startsWith("Bearer "))
    return res.status(400).json({
      status: "failed",
      message: " 1-Please provide a valid token",
    });

  const token = bearerToken.split(" ")[1];

  var user;
  try {
    console.log('here')
    user = await jwt.decode(token);
    console.log("user",user)
    if (!user)
    return res.status(400).json({
      status: "failed",
      message: " 2-Please provide a valid token",
    });
    
    req.user = user;
    
    return next();
  }
  catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "catch error-Please provide a valid token",
    });
  }
};