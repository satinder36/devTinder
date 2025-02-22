const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validatePasswordData,
} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    } else {
      const loggedInUser = req.user;
      const data = req.body;
      Object.keys(data).every((key) => (loggedInUser[key] = data[key]));
      //or use User.findByIdAndUpdate(userId, data, {
      //       returnDocument: "after",
      //       runValidators: true,
      //     });
      await loggedInUser.save();
      res.json({
        message: `${loggedInUser.firstName}, your profile updated successfuly`,
        data: loggedInUser,
      });
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    if (validatePasswordData(req.body)) {
      res.send("ok");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = profileRouter;
