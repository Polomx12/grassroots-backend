const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  administrators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    required: true,
  },
});

const Event = model("Event", EventSchema);

module.exports = Event;
