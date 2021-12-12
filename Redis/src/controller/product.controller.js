const express= require('express');

const router=express.Router();

const Product= require("../models/product.model")

const { createClient } = require('redis');

const redis = createClient();

redis.connect();

router.get("", async (req,res) => {
    redis.on('error', (err) => console.log('Redis Client Error', err));
    try {
           const value= await redis.get("products")

           if(value) return res.status(200).send(value);

           const product = await Product.find().lean().exec();

           redis.set("products",JSON.stringify(product));

           res.status(200).send(product);
           
    } catch (e) {
        res.status(500).json({message: e.message, status:"Failed"});
    }
    
})

router.get("/:id", async (req,res) => {
    redis.on('error', (err) => console.log('Redis Client Error', err));
    try {
        const value = JSON.parse(await redis.get("products"));
        
        let patchedProduct=null;
       
        value.forEach((product) => {
            if(product._id==req.params.id) {
                patchedProduct=product;
            }
        })
        
        if(patchedProduct) return res.status(200).send(patchedProduct);


        const product = await Product.findById(req.params.id).lean().exec();

        res.status(200).send(product);
    }  catch (e) {
        res.status(500).json({message: e.message, status:"Failed"});
    }
})

router.post("", async (req, res) => {
    redis.on('error', (err) => console.log('Redis Client Error', err));
    try {
        const product= await Product.create(req.body);
        const products = await Product.find().lean().exec();
        redis.set("products",JSON.stringify(products));

        res.status(201).send(product);
    } catch (e) {
        res.status(500).json({message: e.message, status:"Failed"});
    }
})

router.patch("/:id" ,async(req,res) => {
    try {
        const product= await Product.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();
        const products = await Product.find().lean().exec();
        redis.set("products",JSON.stringify(products));

        res.status(200).send(product);
    } catch (e) {
        res.status(500).json({message: e.message, status:"Failed"});
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
        const products = await Product.find().lean().exec();
        redis.set("products",JSON.stringify(products));

        res.status(200).send(product);
    } catch (e) {
        res.status(500).json({message: e.message, status:"Failed"});
    }
})

module.exports = router;
