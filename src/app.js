const express = require("express");
const app = express();
const connectDb = require("./config/database");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { User } = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("USer added succ");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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
