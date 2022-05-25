const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const TweetPost = require("../../models/tweetPost");
const User = require("../../models/user");

// feeds
router.get("/", auth, async (req, res) => {
  const auth = req.user;
  const userId = auth._id;

  try {
    const user = await User.findById(userId);
    if (user.following.length < 3) {
      return res.status(400).json({
        message: "You are following less than 3 people",
      });
    }

    if (user.following.length > 2) {
      const firstFollowingId = user.following[0];
      const secondFollowingId = user.following[1];
      const thirdFollowingId = user.following[2];

      const firstFollowingtweetPosts = await TweetPost.find({
        user: firstFollowingId,
      });
      const secondFollowingtweetPosts = await TweetPost.find({
        user: secondFollowingId,
      });
      const thirdFollowingtweetPosts = await TweetPost.find({
        user: thirdFollowingId,
      });

      if (firstFollowingtweetPosts.length > 10) {
        if (secondFollowingtweetPosts.length > 10) {
          if (thirdFollowingtweetPosts.length > 10) {
            const feedpost = [];

            for (let i = 0; i < firstFollowingtweetPosts.length; i++) {
              feedpost.push(firstFollowingtweetPosts[i]);
            }
            for (let i = 0; i < secondFollowingtweetPosts.length; i++) {
              feedpost.push(secondFollowingtweetPosts[i]);
            }
            for (let i = 0; i < thirdFollowingtweetPosts.length; i++) {
              feedpost.push(thirdFollowingtweetPosts[i]);
            }

            return res.send(feedpost);
          } else {
            res.json({
              msg: "You are following someone who has less than 10 tweet",
            });
          }
        } else {
          res.json({
            msg: "You are following someone who has less than 10 tweet",
          });
        }
      } else {
        res.json({
          msg: "You are following someone who has less than 10 tweet",
        });
      }
    }
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.....",
      });
    }
  }
});

module.exports = router;
