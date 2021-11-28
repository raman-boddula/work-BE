const express = require("express");

const Eval = require("../models/eval.models");

const router = express.Router();


router.get("/:date", async (req, res) => {
    try {
        const leaderBoard = await Eval.find({ "date-of-eval": req.params.date }, {"instructor_id":0,"topic_id":0}).populate("student_id").populate({ path: "instructor_id", select: "first_name" + " " + "last_name" }).populate("topic_id").populate({ path: "student_id", populate: { path: "user_id", populate: { path: "user_id", select: "first_name" + " " + "last_name" } } }).sort({"marks":-1}).limit(1).lean().exec();;
        return res.status(201).send(leaderBoard)
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

module.exports = router;
