const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    employe_id: { type: String, required: true, unique: true }
}, {
    versionKey: false,
    timestamps:false
})

module.exports = new model("admin", adminSchema);