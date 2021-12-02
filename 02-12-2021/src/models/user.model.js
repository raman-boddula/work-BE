const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    gender: String,
    age:Number,
}, {
    versionKey: false,
    timestamps:true
})
module.exports = new mongoose.model("user", userSchema);