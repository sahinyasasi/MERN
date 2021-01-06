const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
//path  api/profile/me
//desc to get current user profile
//access  private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//path post api/profile
//desc to create profile
//access  private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skilss is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      location,
      bio,
      status,
      githubusernme,
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusernme) profileFields.githubusernme = githubusernme;
    if (skills) {
      profileFields.skills = skills.split(",").map((skills) => skills.trim());
    }

    profileFields.social = {};
    profileFields.social.twitter = twitter;
    profileFields.social.facebook = facebook;
    profileFields.social.youtube = youtube;
    profileFields.social.linkedin = linkedin;
    profileFields.social.instagram = instagram;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
module.exports = router;
