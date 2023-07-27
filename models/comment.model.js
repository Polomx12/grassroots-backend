//Imports
const {Schema, model} = require("mongoose");

//Creating the schema
const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },

        commentText: {
            type: String,
            maxLength: 400
        },
    },

    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);
module.exports = Comment;
