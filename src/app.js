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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  // returnDocument: "after" , default is "before", it returns the update value either before
  // or after based on the returnDocument set value,its optional param
  try {
    const dataUpdate = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.send(dataUpdate);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
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
