const express = require("express");

const Gallery = require("../models/gallery.model");

const upload =require("../middleware/upload")

const router = express.Router();

router.post("/", upload.single("image_urls"), async (req, res) => {
    try {
        const gallery = await Gallery.create({
            user_id: req.body.user_id,
            image_urls: req.file.path,
        });
        return res.status(201).json({ gallery })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});


router.post("/multiple", upload.any("image_urls"), async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const products = await Gallery.create({
            user_id: req.body.user_id,
            image_urls:filePaths,
        })
        // console.log(products)
        return res.status(201).json({ products })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
})


module.exports = router;