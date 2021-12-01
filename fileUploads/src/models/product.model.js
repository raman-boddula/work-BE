const { Schema, model } = require("mongoose");

const productSChem = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    image_urls:[{type:String ,required:true}]
}, {
    versionKey: false,
    timestamps:false
})

module.exports = new model("user", productSChem);