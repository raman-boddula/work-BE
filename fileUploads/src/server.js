const connect = require("./configs/db");

const app = require("./index")

app.listen(6837, async () => {
    await connect();
    console.log("listening on 4568")
});

module.exports = app;