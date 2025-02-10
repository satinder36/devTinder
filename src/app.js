const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/check", (req, res) => {
  throw new Error("xyz");
});

// app.use("/check", (req, res) => {
//   try {
//     throw new Error("xyz");
//   } catch (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("hhhhh");
  }
});

// app.use("/admin", adminAuth);

// app.get("/admin/getAllUsers", (req, res) => {
//   res.send(" all user");
// });

// app.delete("/admin/deleteUser", (req, res) => {
//   res.send("delete user");
// });

// app.get("/user", userAuth, (req, res) => {
//   res.send(" usere pathsss");
// });

//we can wrap the request handlers in an array, its optional though
// app.get("/check", [
//   (req, res, next) => {
//     console.log("hello");
//     // res.send(" first res");
//     next();
//   },
//   (req, res, next) => {
//     res.send("res 2");
//     console.log(" hello 2222");
//     next();
//     console.log("aftr next");
//   },
// ]);

// can get the params with :userId, use ? after :name if the name is optional, use req.query if the path?userId=100
// app.get("/user/:userId/:name?", (req, res) => {
//   console.log("params", req.params);
//   console.log("query", req.query);

//   res.send("get user");
// });

// app.post("/user", (req, res) => {
//   res.send("post user");
// });

// app.use("/test", (req, res) => {
//   res.send(" testing");
// });

// app.use("/", (req, res) => {
//   res.send(" Hello parent");
// });

app.listen(3000, () => {
  console.log("listening"); //callback func is optional
});
