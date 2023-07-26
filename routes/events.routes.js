//Imports
const router = require("express").Router();
const {Types: {ObjectId}} = require('mongoose');


//Import Models
const Events = require("../models/event.model");

//Import middleware
const isLoggedIn = require("../middleware/isLoggedIn");

//Create an Event
router.post("/", isLoggedIn, (req, res) => {
    const {owner, location, eventDescription, eventName} = req.body;

    // Field validation
    if (typeof location.address != "string") return res.status(400).json({"errorMessage": "Please provide a valid address."});
    if (typeof location.city != "string") return res.status(400).json({"errorMessage": "Please provide a valid city."});
    if (typeof location.state != "string") return res.status(400).json({"errorMessage": "Please provide a valid state."});
    if (typeof location.zipCode != 'number') return res.status(400).json({"errorMessage": "Please provide a valid Zip Code"});
    if (typeof eventName != "string") return res.status(400).json({"errorMessage": "Please provide a valid event name."});
    if (typeof eventDescription != "string") return res.status(400).json({"errorMessage": "Please provide a event description."});
    if (typeof owner != 'string') return res.status(400).json({"errorMessage": "User ID not provided."});

    Events.create(req.body)
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            console.log(err);
            return res.json({message: "Internal Server Error"});
        });
});

//Read all Events
router.get("/", (req, res) => {
    Events.find()
        .then((events) => {
            return res.json(events);
        })
        .catch((err) => {
            console.log(err);
            return res.json({message: "Internal Server Error"});
        });
});

//Read a single event
router.get("/:eventId", (req, res) => {
    // Validate the event ID
    const isValidObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;
    if (!isValidObjectId(req.params.eventId)) {
        return res.status(404).json({errorMessage: "Event ID is incorrect."});
    }

    // Retrieve the event.
    Events.findById(req.params.eventId)
        .then((post) => {
            if (!post) {
                return res.status(404).json({errorMessage: "Event doesn't exist."});
            } else {
                return res.json(post);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.json({message: "Internal Server Error"});
        });
});

//Update an event
router.patch("/:eventId", isLoggedIn, async (req, res) => {
    // Validate the event ID
    const isValidObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;
    if (!isValidObjectId(req.params.eventId)) {
        return res.status(404).json({errorMessage: "Event ID is incorrect."});
    }

    // Retrieve event
    const event = await Events.findById(req.params.eventId).populate({path: "owner", model: 'User'});

    // Validate that the event exists and the user is the owner.
    if (!event) return res.status(404).json({errorMessage: "Event doesn't exist"});
    if (event['owner'].username !== req.user.username) return res.status(401).json({errorMessage: "Not Authorized."});


    //Destructure the request
    const {location, eventDescription, eventName} = req.body;

    // Field validation
    if (typeof location.address != "string") return res.status(400).json({"errorMessage": "Please provide a valid address."});
    if (typeof location.city != "string") return res.status(400).json({"errorMessage": "Please provide a valid city."});
    if (typeof location.state != "string") return res.status(400).json({"errorMessage": "Please provide a valid state."});
    if (typeof location.zipCode != 'number') return res.status(400).json({"errorMessage": "Please provide a valid Zip Code"});
    if (typeof eventName != "string") return res.status(400).json({"errorMessage": "Please provide a valid event name."});
    if (typeof eventDescription != "string") return res.status(400).json({"errorMessage": "Please provide a event description."});

    // Edit the event
    Events.findByIdAndUpdate(req.params.eventId, req.body, {new: true})
        .then((event) => {
            return res.json(event);
        });
});

//Delete a post
router.delete("/:eventId", isLoggedIn, async (req, res) => {
    // Validate the event ID
    const isValidObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;
    if (!isValidObjectId(req.params.eventId)) {
        return res.status(404).json({errorMessage: "Event ID is incorrect."});
    }

    // Retrieve event
    const event = await Events.findById(req.params.eventId).populate({path: "owner", model: 'User'});

    // Validate that the event exists and the user is the owner.
    if (!event) return res.status(404).json({errorMessage: "Event doesn't exist"});
    if (event['owner'].username !== req.user.username) return res.status(401).json({errorMessage: "Not Authorized."});

    Events.findByIdAndDelete(req.params.eventId)
        .then((event) => {
            return res.json(event);
        })
        .catch((err) => {
            console.log(err);
            return res.json({message: "Internal Server Error"});
        });
});

module.exports = router;
