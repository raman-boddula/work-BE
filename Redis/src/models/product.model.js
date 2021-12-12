const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        
        details: { type: String, require: true },
    
        price: { type: Number, require: true }
    },
    {
        versionKey: false,
    
        timestamps: true
    });

module.exports = mongoose.model("product",productSchema);