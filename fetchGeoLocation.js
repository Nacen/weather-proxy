const axios = require("axios");

const fetchGeoLocation = async (encodedAddress, apiKey) => {
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodedAddress}&format=json`;
  try {
    const response = await axios.get(url);
    const data = response.data[0];
    return { latitude: data.lat, longitude: data.lon };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchGeoLocation
};
