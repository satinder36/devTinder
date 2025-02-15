const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    console.log("Sending a connection request");
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = requestRouter;
