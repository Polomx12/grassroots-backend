const {Schema, model} = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required."],
            unique: true,
            maxLength: 50
        },

        password: {
            type: String,
            required: [true, "Password is required."]
        },

        roles: {
            type: String,
            enum: ["User", "Administrator", "SuperAdministrator"],
            default: "User",
        },

        userDescription: {
            type: String,
            maxLength: 700
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
