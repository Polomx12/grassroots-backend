const {Schema, model} = require("mongoose");

const GroupSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, 'User is required.']
        },

        groupDescription: {
            type: String,
            required: [true, 'Group description is required.'],
            maxLength: 300
        },

        groupName: {
            type: String,
            required: [true, "Group Name is required"],
            maxLength: 100
        },
    },
    {
        timestamps: true
    }
);

const Group = model("Group", GroupSchema);

module.exports = Group;
