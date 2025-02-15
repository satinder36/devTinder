const express = require("express");
const appRouter = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { validationSignUpData } = require("../utils/validation");

appRouter.post("/signup", async (req, res) => {
  try {
    validationSignUpData(req);
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      age,
      gender,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

appRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      const token = await user.getJwt();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("User logged in");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

module.exports = appRouter;
