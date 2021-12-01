const transporter = require("./mail");

module.exports = (from,to, subject, text, html,attachments=nul) => {
    message =
    {
        from,
        to,
        subject,
        text,
        html,
        attachments,
    },
        transporter.sendMail(message);
}