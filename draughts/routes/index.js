var express = require('express');
var router = express.Router();

/* For getting to the splash screen. */
router.get("/splash", function(req, res) {
  res.sendFile("splash.html", {root: "./public"});
});

/* Pressing the PLAY button will return the game page. */
router.get("/play", function(req, res) {
  res.sendFile("game.html", {root: "./public"});
});

module.exports = router;
