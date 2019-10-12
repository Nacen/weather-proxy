const axios = require("axios");

const fetchWeather = async (latitude, longitude, apiKey) => {
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]

  const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;
  try {
    const response = await axios.get(url);
    const data = response.data.currently;
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchWeather
};
