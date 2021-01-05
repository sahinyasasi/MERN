const express = require("express");
const router = express.Router();
//path  POST api/users
//desc test route
//access  public
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("user route");
});
module.exports = router;
