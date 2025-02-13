const mongoose = require("mongoose");
const validator = require("validator");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NAMASTEDEV@TEST";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  //   lastName: String, // String is shorthand for {type: String}
  lastName: { type: String, maxLength: 50, trim: true },
  age: { type: Number, required: true, min: 18, max: 100, trim: true },
  gender: {
    type: String,
    //Ist approach
    // validate(value) {
    //   if (!["male", "female", "others"].includes(value)) {
    //     throw new Error("Gender data is not valid");
    //   }
    // },
    //2nd approach
    validate: {
      validator: function (value) {
        //this validator is not from npm lib
        if (!["male", "female", "others"].includes(value)) {
          return false;
        }
        return true;
      },
      message: "Gender data is not valid",
    },
  },

  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    maxLength: 255,
    // validate: {
    //   validator: (value) => {
    //     return validator.isEmail(value);
    //   },
    //   message: (props) => `Invalid email address: ${props.value}`,
    // },
  },
  password: {
    type: String,
    required: true,
    maxLength: 255,
    validate: {
      validator: (value) => {
        return validator.isStrongPassword(value);
      },
      message: (props) => `Invalid Password: ${props.value}`,
    },
  },
  photoUrl: {
    type: String,
    default: "https://geographyandyou.com/images/user-profile.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid Photo URL: " + value);
      }
    },
  },
  about: {
    type: String,
    default: "This is a default about of the user!",
    maxLength: 500,
  },
  skills: {
    type: [String],
    validate: {
      validator: (skillsArray) => {
        return (
          skillsArray.every((skill) => skill.trim().length < 50) &&
          skillsArray.length <= 10
        );
      },
      message: "Each skill must be 50 characters or less",
    },
    set: (skillsArray) => skillsArray.map((skill) => skill.trim()), // Trim spaces
  },
});

userSchema.methods.getJwt = async function () {
  try {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  try {
    const user = this;
    const passwordHash = user.password;
    const isValidPassword = await bcrypt.compare(
      passwordInputByUser,
      passwordHash
    );
    return isValidPassword;
  } catch (err) {
    console.log(err);
  }
};

const User = model("User", userSchema);

module.exports = { User };
