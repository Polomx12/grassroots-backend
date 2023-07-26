// Server import
const router = require("express").Router();

// Package Imports
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Model imports
const User = require("../models/user.model");
const Session = require("../models/session.model");

// Middleware imports
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/session", (req, res) => {
    // we don't want to throw an error, and just maintain the user as null
    if (!req.headers.authorization) {
        return res.json(null);
    }

    // accessToken is being sent on every request in the headers
    const accessToken = req.headers.authorization;
    Session.findById(accessToken)
        .populate("user")
        .then((session) => {
            if (!session) {
                return res.status(404).json({errorMessage: "Session does not exist"});
            }
            return res.status(200).json(session);
        });
});

router.post("/signup", isLoggedOut, (req, res) => {
    const {username, password} = req.body;

    // Validation of username and password
    if (typeof username != "string") return res.status(400).json({errorMessage: "Please provide a valid username and password."});
    if (typeof password != 'string') return res.status(400).json({errorMessage: "Please provide a valid username and password."});

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (!regex.test(password)) {
        return res.status(400).json({
            errorMessage: "Password must have at least 8 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
    }

    // Search the database for a user with the username submitted in the form
    // noinspection JSUnresolvedFunction
    User.findOne({username}).then((found) => {
        // If the user is found, send the message username is taken
        if (found) {
            return res.status(400).json({errorMessage: "Username is already taken."});
        }

        // if user is not found, create a new user - start with hashing the password
        // noinspection JSUnresolvedFunction
        return bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(password, salt))
            .then((hashedPassword) => {
                // Create a user and save it in the database
                return User.create({
                    username, password: hashedPassword,
                });
            })
            .then((user) => {
                return res.status(200).json({message: `Account created for username: ${user.username}`});
            })
            .catch((error) => {
                if (error instanceof mongoose["Error"].ValidationError) {
                    return res.status(400).json({errorMessage: error.message});
                }
                if (error.code === 11000) {
                    return res.status(400).json({
                        errorMessage: "Username needs to be unique. The username you chose is already in use.",
                    });
                }
                return res.status(500).json({errorMessage: error.message});
            });
    });
});

router.post("/login", isLoggedOut, (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({errorMessage: "Please provide your username and password."});
    }

    // Search the database for a user with the username submitted in the form
    User.findOne({username})
        .then((user) => {
            // If the user isn't found, send the message that user provided wrong credentials
            if (!user) {
                return res.status(400).json({errorMessage: "Username doesn't exist."});
            }

            // If user is found based on the username, check if the in putted password matches the one saved in the database
            bcrypt.compare(password, user["password"]).then((isSamePassword) => {
                if (!isSamePassword) {
                    return res.status(400).json({errorMessage: "Wrong combination of username and password."});
                }

                Session.create({user: user._id, createdAt: Date.now()}).then((session) => {
                    return res.json({user, accessToken: session["_id"]});
                });
            });
        })

        .catch((err) => {
            return res.status(500).render("login", {errorMessage: err.message});
        });
});

router.delete("/logout", isLoggedIn, (req, res) => {
    Session.findByIdAndDelete(req.headers.authorization)
        .then(() => {
            return res.status(200).json({message: "User was logged out"});
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({errorMessage: err.message});
        });
});

module.exports = router;
