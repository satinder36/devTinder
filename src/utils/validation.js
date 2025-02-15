const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const data = req.body;
  const DISALLOWED_UPDATE_FIELDS = ["role", "emailId", "password", "createdAt"];

  const isEditAllowed = Object.keys(data).every(
    (field) => !DISALLOWED_UPDATE_FIELDS.includes(field)
  );

  return isEditAllowed;
};

module.exports = { validationSignUpData, validateEditProfileData };
