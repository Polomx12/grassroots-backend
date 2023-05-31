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

    userDescription:{
      type:String,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to Answer", "Questioning", "Other"],
    },

    //TODO: Add default Profile Pic
    profilePic: {
      type: String,
      default: "Default",
    },

    eventsJoinedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    
    groupsJoinedId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
