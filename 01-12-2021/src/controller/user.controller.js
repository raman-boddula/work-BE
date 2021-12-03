const express = require("express");

const Product = require("../models/user.model");

const fs = require('fs');

const upload =require("../middleware/upload")

const Gallery = require("../models/gallery.model")

const router = express.Router();

router.post("/", upload.single("profile_url"), async (req, res) => {
    try {
        const product = await Product.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_url: req.file.path,
        });
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});
router.get("/", async (req, res) => {
    try {
        const product = await Product.find().lean().exec();
        return res.status(201).json({ product });
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
})
router.patch("/:id", async (req, res) => {
    try {
        let x = await Product.findById(req.params.id, { profile_url: 1, "_id": 0 }).lean().exec();
        fs.unlink(x.profile_url, (err) => {
            if (err) {
                console.log(err)
            }
        })
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).json({ product });
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
     }
})

router.delete("/:id", async (req, res) => {
    let gallery = await Gallery.find({"user_id":req.params.id})
 let Userdata = await Product.findById(req.params.id).lean().exec();
    // return  res.status(201).json({data})
    let galleryImages = gallery[0].image_urls;
    galleryImages.push(Userdata.profile_url)
    console.log("galleryImages",galleryImages)
})

// router.delete("/:id", async (req, res) => {
//     // let gallery = await Gallery.findByIdAndDelete({ "user_id": req.params.id }).lean().exec();
//    let data = await Product.findByIdAndDelete(req.params.id).lean().exec();
//     return  res.status(201).json({data})
// })

module.exports = router;