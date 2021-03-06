const express = require("express");
const bodyParser = require("body-parser");
const geo = require("./fetchGeoLocation");
const weather = require("./fetchWeather");
const cors = require('cors')

const GEO_APIKEY = process.env.GEO_APIKEY;
const WEATHER_APIKEY = process.env.WEATHER_APIKEY;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send(`Weather Proxy: Weather API KEY ${WEATHER_APIKEY}`));
app.post("/", (req, res) => {
  const address = req.body.address;
  const fetchData = async () => {
    try {
      const geoData = await geo.fetchGeoLocation(address, GEO_APIKEY);
      const weatherData = await weather.fetchWeather(
        geoData.latitude,
        geoData.longitude,
        WEATHER_APIKEY
      );
      res.json(weatherData);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
