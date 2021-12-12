const connect = require("./configs/db");

const app = require("./index");
const client = require("./configs/redis")
app.listen(4455, async() => {
    await connect();
    await client.connect();
    console.log("Listening on port 4455");
})