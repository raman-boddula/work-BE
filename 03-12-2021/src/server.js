const app = require('./index');

const connect = require("./configs/db");

app.listen(7777, async () => {
    await connect();
    console.log("you are connected on 7777")
})