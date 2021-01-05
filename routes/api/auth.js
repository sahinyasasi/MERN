const express = require("express");
const router = express.Router();
//path  api/auth
//desc test route
//access  public
router.get("/", (req, res) => {
  res.send("auth route");
});
module.exports = router;
