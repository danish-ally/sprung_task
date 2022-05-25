const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// tweetPost Schema

const TweetPostSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },

    user: {
      type: Schema.Types.ObjectId,
    },

    tweet: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("TweetPost", TweetPostSchema);
