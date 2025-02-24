const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./utils/cronJob");
const http = require("http");
const initializeSocket = require("./utils/socket");

const server = http.createServer(app);
initializeSocket(server);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("Something went wrong" + err.message);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.id;
//   try {
//     const data = await User.findByIdAndDelete(userId); //User.findOneAndDelete({_id:userId})
//     console.log("delete data", data);
//     if (data) {
//       res.send("User deleted successfully");
//     } else {
//       res.send("User with this id not found");
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong" + err.message);
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   // returnDocument: "after" , default is "before", it returns the update value either before
//   // or after based on the returnDocument set value,its optional param

//   try {
//     const ALLOWED_UPDATE = [
//       "photoUrl",
//       "about",
//       "gender",
//       "age",
//       "skills",
//       "firstName",
//       "lastName",
//     ];
//     // const isUpdateAllowed = Object.keys(data).every((key) =>
//     //   ALLOWED_UPDATE.includes(key)
//     // );

//     const invalidFields = Object.keys(data).filter(
//       (key) => !ALLOWED_UPDATE.includes(key)
//     );

//     if (invalidFields.length) {
//       throw new Error("Update is not allowed " + invalidFields.join(", "));
//     }
//     const dataUpdate = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send(dataUpdate);
//   } catch (err) {
//     res.status(400).send("Something went wrong " + err.message);
//   }
// });

connectDb()
  .then(() => {
    console.log("connected");
    server.listen(process.env.PORT, () => {
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
