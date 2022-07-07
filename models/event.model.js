const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  administrators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

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
      type: Number,
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

  eventDescription: {
    type: String,
  },

  eventImage: {
    type: String,
  },

  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },

  likes: {
    type: Number,
    default: 0,
  },

  eventName: {
    type: String,
  },
});

const Event = model("Event", EventSchema);

module.exports = Event;
