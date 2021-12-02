const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb+srv://raman_boddula:ramanboddula@cluster0.pxmsk.mongodb.net/validationsAssignment");
}