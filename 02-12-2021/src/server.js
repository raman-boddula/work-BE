const connect = require("./config/db");

const app = require('./index');

app.listen(4535, async () => {
    await connect();
    console.log("you are connected on 4535")
})