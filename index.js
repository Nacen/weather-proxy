const express = require("express");
const bodyParser = require("body-parser");
const geo = require("./fetchGeoLocation");
const weather = require("./fetchWeather");

const GEO_APIKEY = "d931d150398302";
const WEATHER_APIKEY = "d8a8f8b2ac40d9ace65be29ac279c20b";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, content-type");
  next();
});

app.post("/weather", (req, res) => {
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
