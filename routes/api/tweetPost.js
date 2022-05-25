const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const TweetPost = require("../../models/tweetPost");

// For posting tweet
router.post("/", auth, async (req, res) => {
  const auth = req.user;
  const userId = auth._id;

  const tweetPost = new TweetPost(Object.assign(req.body, { user: userId }));

  try {
    const t1 = await tweetPost.save();
    return res.status(200).json({
      success: true,
      message: `Tweeted successfully!`,
      post: t1,
    });
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
    const tweetPosts = await TweetPost.find({ user: req.params.id });

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
