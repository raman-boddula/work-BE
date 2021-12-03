const express = require("express");

const fs = require('fs');

const User = require("../models/user.model")

const Gallery = require("../models/gallery.model");

const upload =require("../middleware/upload")

const router = express.Router();


router.post("", upload.any("image_urls"), async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const products = await Gallery.create({
            user_id: req.body.user_id,
            image_urls:filePaths,
        })
        return res.status(201).json({ products })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
})
router.get("/", async (req, res) => {
    const gallery = await Gallery.find().lean().exec();
    return res.send(gallery)
})
router.delete("/:id", async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id).populate("user_id").lean().exec();
        
        gallery.image_urls.push(gallery.user_id.profile_url)
        
        gallery.image_urls.forEach((el) => {
                fs.unlink(el, (err) => {
                        if (err) {
                                console.log(err);
                            }
                        })
                    })
        let data = await User.findByIdAndDelete(gallery.user_id._id).lean().exec();

        let Gallerydata = await Gallery.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(201).json({ Gallerydata, data });
     }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
})


module.exports = router;