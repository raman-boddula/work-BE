const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, {
    versionKey: false,
    timestamps:true
}
);
module.exports = mongoose.model("topics",topicSchema);