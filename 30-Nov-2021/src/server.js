const connect = require("./configs/db");

const app = require("./index")

app.listen(6969, async () => {
    await connect();
    console.log("listening on 6969")
});

module.exports = app;