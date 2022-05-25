const router = require("express").Router();
const authRoutes = require("./auth");
const tweetPostRoutes = require("./tweetPost");
const followRoutes = require("./follow");
const feedRoutes = require("./feed");

// auth routes
router.use("/auth", authRoutes);
// tweet post routes
router.use("/tweetPost", tweetPostRoutes);
// follow routes
router.use("/follow", followRoutes);
// feed routes
router.use("/feed", feedRoutes);

module.exports = router;
