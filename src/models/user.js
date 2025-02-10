const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: String, // String is shorthand for {type: String}
  age: Number,
  gender: String,
  email: String,
});

const User = model("User", userSchema);

module.exports = { User };
