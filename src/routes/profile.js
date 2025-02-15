const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User doesnt exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = profileRouter;
