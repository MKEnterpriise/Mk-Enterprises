const express = require("express");
const router = express.Router();
const passport = require("passport");

const { googleCallback, getUserProfile, isAdmin } = require("../controller/OAuth.controller");


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), googleCallback);

router.get("/getUserprofile", getUserProfile);

router.post("/isAdmin", isAdmin);

module.exports = router;