const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    product_name: { type: String, required: true },
    price: { type: String, required: true }
}, {
    versionKey: false,
    timestamps:false
})

module.exports = new model("product", productSchema);