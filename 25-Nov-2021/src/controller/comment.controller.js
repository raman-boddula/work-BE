
const express = require("express")

const Comment = require("../models/comment.model")

const app = express.Router();


app.post("", async (req, res) => {
    try {
      const comment = await Comment.create(req.body);
  
      return res.status(201).send(comment);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  app.get("", async (req, res) => {
    try {
      const comments = await Comment.find().lean().exec();
  
      return res.send(comments);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  app.get("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).lean().exec();
  
      return res.send(comment);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  app.patch("/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.send(comment);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
  app.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
  
      return res.send(comment);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });

module.exports = app;