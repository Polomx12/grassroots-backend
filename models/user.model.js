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

        userDescription: {
            type: String,
            maxLength: 700
        },

        email:{
            type: String,
            maxLength: 50
        },

        website: {
            type: String,
            maxLength: 300
        },

        userImage:{
            type: String,
            maxLength: 200
        }
    },

    {
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;
