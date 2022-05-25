const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const key = require("../../config/key");

const { accessSecret, accessTokenLife } = key.jwt;

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(400).json({ error: "You must enter an email address." });
  }

  if (!password) {
    return res.status(400).json({ error: "You must enter a password." });
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .send({ error: "No user found for this email address." });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
        };

        jwt.sign(
          payload,
          accessSecret,
          { expiresIn: accessTokenLife },
          (err, AccessToken) => {
            res.status(200).json({
              success: true,
              AccessToken: `${AccessToken}`,
              user: user,
            });
          }
        );
      } else {
        res.status(400).json({
          success: false,
          error: "Password Incorrect",
        });
      }
    });
  });
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(Object.assign(req.body));
    const email = user.email;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "That email address is already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    const registeredUser = await user.save();
    const payload = {
      id: registeredUser._id,
    };

    const token = jwt.sign(payload, accessSecret, {
      expiresIn: accessTokenLife,
    });

    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      message: `User has been registered successfully!`,
      user: registeredUser,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

module.exports = router;
