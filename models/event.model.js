const {Schema, model} = require("mongoose");

const EventSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required."]
    },

    location: {
        address: {
            type: String,
            required: [true, "Address is required."],
        },

        city: {
            type: String,
            required: [true, "City is required."],
        },

        state: {
            type: String,
            required: [true, "State is required."],
        },

        zipCode: {
            type: Number,
            required: [true, "ZipCode is required."],
        },
    },

    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],

    eventDescription: {
        type: String,
        required: [true, "Event Description is required."],
    },

    eventName: {
        type: String,
        required: [true, "Event Name is required."]
    },
});

const Event = model("Event", EventSchema);

module.exports = Event;
