const express = require("express");

const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/evaluation")
}

const app = express();

app.use(express.json());

//topicsschema
const topicSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, {
    versionKey: false,
    timestamps:true
}
);
//topics CRUD

const Topic = mongoose.model("topics", topicSchema);

app.post("/topic", async (req, res) => {
    try {
        const topicsList = await Topic.create(req.body);
        return res.status(201).send(topicsList );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/topics", async (req, res) => {
    try {
        const topisList = await Topic.find().lean().exec();
        return res.send({ topisList });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/topics/:id", async (req, res) => {
    try {
        const topicList = await Topic.findById(req.params.id).lean().exec();
        return res.send({ topicList });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/topics/:id", async (req, res) => {
    try {
        const topicList = await Topic.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ topicList });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

app.delete("/topics/:id", async (req, res) => {
    try {
        const topicList = await Topic.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({topicList})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

//USERSCHEMA

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

const User = mongoose.model("user", userSchema);
//USERCRUD

app.post("/user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/users", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.send({ user });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.send({ user });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ user });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({user})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
//student_schema

const studentSchema = new mongoose.Schema({
    "rollNumber": { type: String, required: true },
    "current_batch": { type: String, required: true },
    "user_id": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true,
    }
}, {
    versionKey: false,
    timestamps:true,
})

//studnets_crud

const Student = mongoose.model("student", studentSchema);

app.post("/student", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(201).send(student );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/students", async (req, res) => {
    try {
        const student = await Student.find().lean().exec();
        return res.send({ student });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).lean().exec();
        return res.send({ student });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ student });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({student})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
//evaluation

const evalSchema = new mongoose.Schema({
    "date-of-eval": { type: String, requied: true },
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

const Eval = mongoose.model("eval", evalSchema);

//eval crud

app.post("/eval", async (req, res) => {
    try {
        const eval = await Eval.create(req.body);
        return res.status(201).send(eval );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/evals", async (req, res) => {
    try {
        const eval = await Eval.find().lean().exec();
        return res.send({ eval });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/evals/:id", async (req, res) => {
    try {
        const eval = await Eval.findById(req.params.id).lean().exec();
        return res.send({ eval });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/evals/:id", async (req, res) => {
    try {
        const eval = await Eval.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ eval });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

app.delete("/evals/:id", async (req, res) => {
    try {
        const eval = await Eval.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({eval})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

//fetch all students who gave a particular evaluation
app.get("/results/:date", async (req, res) => {
    try {
        const evalData = await Eval.find({ "date-of-eval": req.params.date }).populate("student_id").populate({ path: "instructor_id", select: "first_name" + " " + "last_name" }).populate("topic_id").populate({ path: "student_id", populate: { path: "user_id", populate: { path: "user_id", select:"first_name"+" "+"last_name"}}}).lean().exec();
        return res.status(201).send(evalData);
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
        
    }
})
///fetch the student with his personal details who scored the highest mark in the evaluation

app.get("/leaderBoard/:date", async (req, res) => {
    try {
        const leaderBoard = await Eval.find({ "date-of-eval": req.params.date }, {"instructor_id":0,"topic_id":0}).populate("student_id").populate({ path: "instructor_id", select: "first_name" + " " + "last_name" }).populate("topic_id").populate({ path: "student_id", populate: { path: "user_id", populate: { path: "user_id", select: "first_name" + " " + "last_name" } } }).sort({"marks":-1}).limit(1).lean().exec();;
        return res.status(201).send(leaderBoard)
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

app.listen(4567, async () => {
    await connect();
    console.log("listening on 4567 port")
})