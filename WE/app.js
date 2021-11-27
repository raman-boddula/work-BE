const express = require("express");

const mongoose = require("mongoose");


const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/test");
};


const app = express();

app.use(express.json());

///post schema

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    tag_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required: true,
    }],
}, {
    versionKey: false ,
    timestamps:true ,
});

const Post = mongoose.model('post', postSchema);


//SCHEMA TAG

const tagSchema = new mongoose.Schema({
    name: {
        type: String, required:true 
    }
}, {
    versionKey: false,
    timestamps :true ,
})
const Tag = mongoose.model('tag',tagSchema)
//comment schema
const commentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required :true,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true,
    }
}, {
    versionKey: false,
    timestamps:true ,
})

const Comment = mongoose.model('comment', commentSchema);

//post crud
app.post("/posts", async (req, res) => {
    try {
        const data = await Post.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("/posts", async (req, res) => {
    try {
        const data = await Post.find().populate({ path: "user_id", select: "first_name" }).populate({path:"tag_ids",select:"name"}).lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/posts/:id", async (req, res) => {
    try {
        const data = await Post.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/posts/:id", async(req, res) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const data = await Post.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})

//comment crud

app.post("/comments", async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        
        return res.status(201).send(comment);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.get("/comments", async (req, res) => {
    try {
        const comments = await Comment.find().populate({path: "user_id",select :"first_name"}).populate("post_id").lean().exec();
        
        return res.send(comments);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.get("/comments/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).lean().exec();
        
        return res.send(comment);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.patch("/comments/:id", async (req, res) => {
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

app.delete("/comments/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
  
        return res.send(comment);
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});



//CRUC TAG


app.post("/tags", async (req, res) => {
    try {
        const data = await Tag.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("/tags", async (req, res) => {
    try {
        const data = await Tag.find().lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/tags/:id", async (req, res) => {
    try {
        const data = await Tag.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/tags/:id", async(req, res) => {
    try {
        const data = await Tag.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/tags/:id", async (req, res) => {
    try {
        const data = await Tag.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})
app.get("/tags/:id/posts", async (req, res) => {
    try {
      const tag = await Tag.findById(req.params.id).lean().exec();
      const posts = await Post.find({ tag_ids: tag._id })
          .populate("tag_ids")
          .populate({path:"user_id",select :"first_name"})
      .lean()
        .exec();
        
        return res.status(200).send({ posts });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});



//user schema


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    age: { type: Number, required:true },
    gender: { type: String, required:"false" ,default:"Male"}
},
{
    versionKey: false,
    timestamps:true,
});
//STEP-3
//USER CRUD
const User = mongoose.model("user", userSchema)


app.post("/users", async (req, res) => {
    try {
        const data = await User.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("/users", async (req, res) => {
    try {
        const data = await User.find().lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        const data = await User.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/users/:id", async(req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})



app.listen(7000, async function () {
    await connect();
    console.log("listening on port 2690")
});