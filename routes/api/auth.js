const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const {
  check,
  validatorCheck,
  validationResult,
} = require("express-validator");
const becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route GET api/AUTH

//@desc Test route

//@access public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.error("The auth api failed" + err);
   return res.status(500).json({ error: "Error in the auth api" });
  }
});

router.post(
  "/",
  [
    check("email", "Please enter a correct email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    let { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid credentials, user not exists" });
      }
     
      let isMatch = await becrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid credentials, user not exists" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error("Error in the login" + err);
      return res.status(500).json({ error: "Error while logging" });
    }
  }
);

module.exports = router;
