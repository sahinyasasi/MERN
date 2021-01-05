const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
//path  POST api/users
//desc test route
//access  public
router.post(
  "/",
  [
    check("name", "please enter name ").not().isEmpty(),
    check("email", "plese enter valid email").isEmail(),
    check("password", "enter a password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).send({ errors: [{ msg: "user already exists" }] });
      }
      //get users gravatar
      //encrypt password

      res.send("user route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
