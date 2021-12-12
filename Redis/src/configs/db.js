const mongoose = require("mongoose");

module.exports = async() => {
  await  mongoose.connect("mongodb+srv://raman_boddula:ramanboddula@cluster0.pxmsk.mongodb.net/redisW");
}