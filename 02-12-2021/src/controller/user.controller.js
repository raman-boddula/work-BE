const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.post("/",
    body("first_name").isLength({min:4}).withMessage("first_name is required"),
    body("last_name").isLength({min:4}).withMessage("last_name is required"),
    body("email").custom(async (value) => {
        const isEmail =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
        if (!isEmail) {
            throw new Error("please enter a valid email address")
        }
        const productByEmail = await User.findOne({ email: value }).lean().exec();
        if (productByEmail) {
            throw new Error("please try with a different mail address");
        }
        return true;
    }),

    body("pincode").isLength({min:6,max:6}).withMessage("enter a proper SIX digit pincode of your area"),
    body("age").isLength({min:1,max:2}).withMessage("enter a proper age "),
    body("gender").isLength({min:3}).withMessage("enter a proper gender with atleast of 3 characters"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errorMsg = errors.array().map(({ msg, param, location }) => {
                return {
                    [param]: msg,
                };
            });
            return res.status(400).json({ errors: errorMsg });
        }
        try {
            const user = await User.create(req.body);
            return res.status(201).json({ user });
        }
        catch (e) {
            return res.status(500).json({ status: "failed", messafe: e.message });
        }
    }
)
    

module.exports = router;