const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    title: { type: String, required: true },
    bodyy: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required:true,
    }
})