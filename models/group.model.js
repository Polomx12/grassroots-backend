const { Schema, model } = require("mongoose");

const GroupSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  groupDescription: {
    type: String,
    required: [true, 'Group description is required.'],
    maxLength: 100
  },

  groupName: {
    type: String,
    required: [true, "Group Name is required"],
    maxLength: 50
  },
});

const Group = model("Group", GroupSchema);

module.exports = Group;
