const express = require("express");

const mongoose = require("mongoose");


//STEP-1
const connect = () => {
    return mongoose.connect("mongodb+srv://raman_boddula:ramanboddula@cluster0.pxmsk.mongodb.net/test");
};
//STEP-2
const userSchema = new mongoose.Schema({
    id: { type: String, required: true ,unique:true},
    title: { type: String, required: true ,unique:true},
    budget: { type: String, required: true },
    production_year: { type: String, required:true },
    movie_genre: { type: String, required: true}
    },
    {
    versionKey: false,
    timestamps:true,
});
//STEP-3
const Movie = mongoose.model("movie",userSchema)

const app = express();

app.use(express.json());

app.post("/movie", async (req, res) => {
    try {
        const data = await Movie.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("/movies", async (req, res) => {
    try {
        const data = await Movie.find().lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/movies/:id", async (req, res) => {
    try {
        const data = await Movie.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/movies/:id", async(req, res) => {
    try {
        const data = await Movie.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/movies/:id", async (req, res) => {
    try {
        const data = await Movie.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})

app.listen(2679, async function () {
    await connect();
    console.log("listening on port 2679")
});