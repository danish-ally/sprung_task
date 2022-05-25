const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// User Schema

const UserSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },

    email: {
      type: String,
      required: () => {
        return this.provider !== "email" ? false : true;
      },
    },

    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },

    password: {
      type: String,
    },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model("User", UserSchema);
