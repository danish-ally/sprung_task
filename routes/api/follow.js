const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const TweetPost = require("../../models/tweetPost");
const User = require("../../models/user");

// For following
router.put("/", auth, async (req, res) => {
  const auth = req.user;
  const userId = auth._id;
  const following = req.body.following;

  try {
    const user = await User.findById(userId);
    user.following.push(following);

    user.save();
    res.send(user);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.....",
      });
    }
  }
});
//get All Post By User Id
router.get("/list/:id", auth, async (req, res) => {
  try {
    const tweetPosts = await await TweetPost.find({ user: req.params.id });

    res.json(tweetPosts);
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
});

module.exports = router;
