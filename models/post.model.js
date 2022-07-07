const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    userName: {
      type: String,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },

    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },

    postText: {
      type: String,
    },

    likes: {
      type: Number,
      default: 0,
    },

    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", PostSchema)

module.exports = Post;
