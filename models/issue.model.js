const { Schema, model } = require("mongoose");

const IssueSchema = new Schema({
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],

  issueName: {
    type: String,
    required: [true, "Name is required"],
  },

  shortDescription: {
    type: String,
    required: [true, "A short Issue Description is required"],
  },

  issueDescription: {
    type: String,
  },

  issueImage: {
    type: String,
  },
});

const Issue = model("Issue", IssueSchema);

module.exports = Issue;
