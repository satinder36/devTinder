const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { User } = require("./models/user");
const connectDb = require("./config/database");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { validationSignUpData } = require("./utils/validation");

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      res.send("User logged in");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const userData = await User.find({ emailId: userEmail });
    if (userData.length !== 0) {
      res.send(userData);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const data = await User.findByIdAndDelete(userId); //User.findOneAndDelete({_id:userId})
    console.log("delete data", data);
    if (data) {
      res.send("User deleted successfully");
    } else {
      res.send("User with this id not found");
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  // returnDocument: "after" , default is "before", it returns the update value either before
  // or after based on the returnDocument set value,its optional param

  try {
    const ALLOWED_UPDATE = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "firstName",
      "lastName",
    ];
    // const isUpdateAllowed = Object.keys(data).every((key) =>
    //   ALLOWED_UPDATE.includes(key)
    // );

    const invalidFields = Object.keys(data).filter(
      (key) => !ALLOWED_UPDATE.includes(key)
    );

    if (invalidFields.length) {
      throw new Error("Update is not allowed " + invalidFields.join(", "));
    }
    const dataUpdate = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(dataUpdate);
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("connected");
    app.listen(3000, () => {
      console.log("listening"); //callback func is optional
    });
  })
  .catch((err) => {
    console.log("error");
  });

// const startServer = async () => {
//   try {
//     await connectDb();
//     console.log("connected");

//     app.listen(3000, () => {
//       console.log("listening"); // callback function is optional
//     });
//   } catch (err) {
//     console.log("error", err);
//   }
// };

// startServer();
