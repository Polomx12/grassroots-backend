const {Schema, model} = require("mongoose");

const PostSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, 'User ID is required.']
        },

        externalId: {
            type: String,
            required: [true, 'External ID is required.']
        },

        postText: {
            type: String,
            maxLength: 780,
            required: [true, 'User ID is required.']
        },

        postTitle: {
            type: String,
            maxLength: 50,
            required: [true, 'User ID is required.']
        },
    },
    {
        timestamps: true,
    }
);

const Post = model("Post", PostSchema);

module.exports = Post;
