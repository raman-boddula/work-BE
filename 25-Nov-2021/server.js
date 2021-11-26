const app = require("./configs/db")

app.listen(2679, async function () {
    await connect();
    console.log("listening on port 2678")
});

