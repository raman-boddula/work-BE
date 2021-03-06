const mongoose = require("mongoose");

const User = require("../models/user.model")

const galleySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required:true
    },
    image_urls:[{type:String ,required:true}]
}, {
    versionKey: false,
    timestamps:false
})


module.exports = new mongoose.model("gallery", galleySchema);