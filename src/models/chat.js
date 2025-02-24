const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const messsageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatSchema = Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [messsageSchema],
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

module.exports = { Chat };
