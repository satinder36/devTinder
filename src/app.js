const express = require("express");
const app = express();
const connectDb = require("./config/database");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { User } = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Satinder",
    lastName: "Singh",
  });

  try {
    await user.save();
    res.send("USer added succ");
  } catch (err) {
    res.staus(400).send("Something went wrong");
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
