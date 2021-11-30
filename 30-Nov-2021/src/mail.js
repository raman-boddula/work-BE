const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS 
    auth:
    {
        user: "3d69b035d9f40e",
        pass: "94620400e77b46"
    },
});
