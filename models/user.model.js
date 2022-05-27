const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

    roles: {
      type: String,
      enum: ["User", "Administrator", "SuperAdministrator"],
      default: "User",
    },

    email: {
      type: String,
    },

    twitter: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to Answer", "Questioning", "Other"],
    },

    personalWebPage: {
      type: String,
    },

    description: {
      type: String,
    },

    //TODO: Add default Profile Pic
    profilePic: {
      type: String,
      default: "Default",
    },

    issuesJoinedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],

    eventsCreatedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    eventsJoinedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    groupsCreatedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],

    groupsJoinedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Groups",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
