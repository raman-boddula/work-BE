const nodemailer = require("nodemailer");

require("dotenv").config();

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS 
    auth:
    {
        user:"3d69b035d9f40e",
            // process.env.NODE_ENV == "development"
            // ? process.env.SMTP_DEVELOPMENT_USERNAME
            // :  process.env.SMTP_PROD_USERNAME,
            pass:"94620400e77b46",
        // process.env.NODE_ENV == "development"
        //     ? process.env.SMTP_DEVELOPMENT_PASSWORD
        //     : process.env.SMTP_PROD_PASSWORD,
    },
});
