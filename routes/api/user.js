const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const becrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");


//express validator for the fields

const { check, validationResult } = require("express-validator/check");

//@route POST api/USER

//@desc register the users

//@access public

router.post(
  "/",
  [
    check("name", "Please enter a name").not().isEmpty(),

    check("email", "Please enter a password").not().isEmpty(),

    check("password", "Please enter a corect length password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if ( !error.isEmpty()){
        return res.status(400).json({ error : error.array()});
    }

    const { name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({error : [{ msg : "user already exists"}]});
        }
        const avatar = gravatar.url ({
            s : '200',
            r: "pg",
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await becrypt.genSalt(10);
        user.password = await becrypt.hash(password, salt);

        await user.save();
        const payload = {
           user: {
            id : user.id
        }
    };

        jwt.sign(payload, config.get("jwtSecret"), {expiresIn : 36000},
         (err, token) =>{
            if (err) throw err;
            res.json({token});

        });

    } catch (err){
        console.error("Error is the get user module" + err);
        res.status(500).json("Error while registering the user")
    }
  }
);

module.exports = router;
