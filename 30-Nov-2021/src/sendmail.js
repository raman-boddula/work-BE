const transporter = require("../src/mail");

module.exports = (from, to, subject, text, html) => {
    message =
    {
        from,
        to,
        subject,
        text,
        html,
    },
        transporter.sendMail(message);
}