const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode.user;
    next();
  }catch( err){
      console.error("Issue in jwt middle ware" + err);
      return res.status(401).json({error: "Token is not valid"});
  }
};
