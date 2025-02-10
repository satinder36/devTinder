const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://satinderneog:8yLvO7xAeE2TSYIE@namastenode.yn2v3.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
