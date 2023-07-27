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
            maxLength: 100
        },

        city: {
            type: String,
            required: [true, "City is required."],
            maxLength: 100
        },

        state: {
            type: String,
            required: [true, "State is required."],
            maxLength: 100

        },

        zipCode: {
            type: Number,
            required: [true, "ZipCode is required."],
            maxLength: 5
        },
    },

    eventDescription: {
        type: String,
        required: [true, "Event description is required."],
        maxLength: 100
    },

    eventName: {
        type: String,
        required: [true, "Event name is required."],
        maxLength: 50
    },
});

const Event = model("Event", EventSchema);

module.exports = Event;
