const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "first_name": { type: String, required: true, unique: true },
    "last_name": { type: String, required: true, unique: true },
    "gender": { type: String, required: false, default: "Male" },
    "date-of-birth": { type: String, required: true },
},
{
    versionKey: false,
    timestamps:true,
})

module.exports = mongoose.model("user", userSchema);