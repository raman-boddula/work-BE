const app = require('./index');

const connect = require("./config/db");

app.listen(4636, async () => {
    await connect();
    console.log("you are connected on 4636")
})