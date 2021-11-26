
const express = require("express")

const Tag = require("../models/tags.model")

const Post = require("../models/post.model")


const app = express.Router();



app.post("", async (req, res) => {
    try {
        const data = await Tag.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("", async (req, res) => {
    try {
        const data = await Tag.find().lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/:id", async (req, res) => {
    try {
        const data = await Tag.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/:id", async(req, res) => {
    try {
        const data = await Tag.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const data = await Tag.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})
app.get("/:id/posts", async (req, res) => {
    try {
      const tag = await Tag.findById(req.params.id).lean().exec();
      const posts = await Post.find({ tag_ids: tag._id })
        .populate("tag_ids")
        .lean()
        .exec();
  
      return res.status(200).send({ posts, tag });
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

module.exports = app;