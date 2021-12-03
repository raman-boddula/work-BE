const express = require("express");

const Product = require("../models/user.model");

const path = require("path")

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

router.patch("/:id",upload.single("profile_url"),async(req,res)=>{
    try {
        
        if(req.file.path)
        {
            const path = await Product.findById(req.params.id,{"profile_url" : 1}).lean().exec();
            fs.unlink(path.profile_url,(err)=>{
                if(err)
                {
                    console.log(err);
                }
            })
        }
    
        const userData = await Product.findByIdAndUpdate(req.params.id,{"first_name" : req.body.first_name,"last_name" : req.body.last_name,"profile_url" : req.file.path},{new:true,
        }).lean().exec();
    
        res.status(201).json({userData});
    } catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
        
}
});

router.delete("/:id", async (req, res) => {
    var gallery = await Gallery.find({"user_id":req.params.id})
 var Userdata = await Product.findById(req.params.id).lean().exec();
    // return  res.status(201).json({data})
    // console.log(gallery)
        let galleryImages = gallery[0].image_urls;
        galleryImages.push(Userdata.profile_url)
        console.log("galleryImages", galleryImages)
        galleryImages.forEach((el) => {
            fs.unlink(el, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })
        var deleteData = await Gallery.findByIdAndDelete(gallery[0]._id).lean().exec();
        // console.log("delet",deleteData)        }
    let userDeleteData = await Product.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).json({ deleteData, userDeleteData })
    })

// router.delete("/:id", async (req, res) => {
//     // let gallery = await Gallery.findByIdAndDelete({ "user_id": req.params.id }).lean().exec();
//    let data = await Product.findByIdAndDelete(req.params.id).lean().exec();
//     return  res.status(201).json({data})
// })

module.exports = router;