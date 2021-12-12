const express = require("express");

const router = express.Router();

const Weather = require("../models/weather.model");

const client = require("../configs/redis");

router.get("",  (req, res) =>
{
    client.get("weather", async function (err, forecasts)
    {
        console.log("forecasts", forecasts);

        if (err) console.log(err);

        if (forecasts) return res.status(200).send(JSON.stringify(forecasts));

        const forecast = await Weather.find().lean().exec();

        client.set("weather", JSON.stringify(forecast))

        return res.send(forecast);
    })
})

router.post("", async (req, res) => {
    const weather_forecast = await Weather.create(req.body);

    const forecast = await Weather.find().lean().exec();

    client.set("weather", JSON.stringify(forecast));

    return res.send(weather_forecast);
})

router.get("/:id", async (req, res) => {
    client.get(`weather.${req.params.id}`, async (err, forecast) => {

        if (err) console.log(err);

        if (forecast) return res.status(201).send({ cached_forecast: JSON.parse(forecast) });

        const weather = await Weather.findById(req.params.id).lean().exec();

        client.set(`weather.${req.params.id}`, JSON.stringify(weather));

        return res.status(201).send({ db_forecast: weather });

    })
})




module.exports = router;