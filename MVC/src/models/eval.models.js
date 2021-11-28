const mongoose = require("mongoose");

const evalSchema = new mongoose.Schema({
    "date-of-eval": { type: String, required: true },
    "instructor_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    "topic_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
        required: true,
    },
    "student_id":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true,
    },
    "marks":{type:String , required:true}
}, {
    versionKey: false,
    timestamps:true,
})

module.exports = mongoose.model("eval", evalSchema);
