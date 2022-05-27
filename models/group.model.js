const { Schema, model } = require("mongoose");

const GroupSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  administrators: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  location: {
    address: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    zipCode: {
      type: String,
    },
  },

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  issue: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
  },

  groupDescription: {
    type: String,
  },

  groupImage: {
    type: String,
    default:"https://res.cloudinary.com/polomx12/image/upload/v1653650858/Grassroots/860x394-1-5_atzspc.jpg"
  },

  webPage: {
    type: String,
  },

  groupMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  likes: {
    type: Number,
    default: 0,
  },

  groupEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],

  groupName: {
    type: String,
    required: [true, "Group Name is required"],
  },
});

const Group = model("Group", GroupSchema);

module.exports = Group;
