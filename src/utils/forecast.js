const request = require("request");

const forecast = (latitude, longitude, temperature, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9ec21ba774fef06e8cb4dcc37f952252&query=${latitude},${longitude}&units=${temperature}`;
  console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
