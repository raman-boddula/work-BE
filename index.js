const { application } = require("express");
const express = require("express");
//console.log('express', express)

const app = express();

// app.get("/", (req, res) => {
//      res.send("Welcome to homepagage")
// })

app.get("", (req, res) => {
    const data = [{ "first_name": "Merrily", "last_name": "Jadczak", "email": "mjadczak0@tuttocitta.it", "gender": "Agender" },
    { "first_name": "Lamar", "last_name": "Tavernor", "email": "ltavernor1@i2i.jp", "gender": "Genderqueer" },
    { "first_name": "Dulcea", "last_name": "Kerner", "email": "dkerner2@github.com", "gender": "Agender" },
    { "first_name": "Binni", "last_name": "Chiplin", "email": "bchiplin3@comsenz.com", "gender": "Female" },
    { "first_name": "Ramsay", "last_name": "Vynall", "email": "rvynall4@nsw.gov.au", "gender": "Agender" },
    { "first_name": "Veronika", "last_name": "Ionnisian", "email": "vionnisian5@cloudflare.com", "gender": "Male" },
    { "first_name": "Electra", "last_name": "Murrum", "email": "emurrum6@mit.edu", "gender": "Male" },
    { "first_name": "Chris", "last_name": "Brodest", "email": "cbrodest7@google.com.hk", "gender": "Agender" },
    { "first_name": "Adah", "last_name": "Harriskine", "email": "aharriskine8@globo.com", "gender": "Non-binary" },
    { "first_name": "Yehudit", "last_name": "Rossin", "email": "yrossin9@123-reg.co.uk", "gender": "Genderqueer" }];
        return res.send(data[0].first_name + " "+data[0].last_name);
    })


app.listen(2345, () => {
    console.log('listening on port 2345');
});