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

const validatePasswordData = (req, res) => {
  const data = req;
  const ALLOWED_PASSWORD_FIELDS = ["currentPassword", "newPassword"];

  const checkArray = Array(ALLOWED_PASSWORD_FIELDS.length).fill(false);

  const isPasswordAllowed = Object.keys(data).forEach((field, index) => {
    if (ALLOWED_PASSWORD_FIELDS.includes(field)) {
      checkArray[index] = true;
    }
  });

  return true;
};

module.exports = {
  validationSignUpData,
  validateEditProfileData,
  validatePasswordData,
};
