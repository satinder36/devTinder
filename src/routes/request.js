const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { User } = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req?.params?.toUserId;
      const status = req?.params?.status;

      const ALLOWED_STATUS = ["ignored", "interested"];

      if (!ALLOWED_STATUS.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }
      console.log("here", toUserId);

      const toUser = await User.findById(toUserId);

      console.log("toUser", toUser);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Action taken successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Something went wrong " + err.message);
    }
  }
);

module.exports = requestRouter;
