const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const instance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;

    console.log(membershipAmount[membershipType], " type");
    const { firstName, lastName, emailId } = req.user;
    const order = await instance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    const data = {
      ...savedPayment.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID,
    };
    res.send({ message: "Success", ...data }); ///...data , otherwise -> orders.data.data , now -> order.data
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = paymentRouter;
