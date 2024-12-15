const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const temperatureElement = document.querySelector("#temperature");
const weatherElement = document.querySelector(".weather--container");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;
  const temperature = temperatureElement.value;

  messageOne.textContent = "Loading...";
  // messageTwo.textContent = "";

  fetch(`/weather?address=${location}&temperature=${temperature}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          // console.log(forecast);

          messageOne.textContent = "";

          let unitMetric = "";

          switch (data.forecast.request.unit) {
            case "m":
              unitMetric = "Metric";
              break;
            case "s":
              unitMetric = "Scientific";
              break;
            case "f":
              unitMetric = "Fahrenheit";
              break;
          }
          // messageTwo.textContent = data.forecast;
          weatherElement.innerHTML = `
            <div class="location--information">
              <h2 class="state">${data.forecast.location.region}</h2>
              <p class="city">${data.forecast.location.name}</p>
            </div>
            <div class="weather--img">
                <img src="${data.forecast.current.weather_icons[0]}" alt="Weather icon">
            </div>
            <div class="temperature--information">
                <p class="temperature--metric">Temperature on ${unitMetric}</p>
                <p class="temperature">${data.forecast.current.temperature}</p>
                <p class="weather--description">${data.forecast.current.weather_descriptions[0]}</p>
            </div>
        `;
        }
      });
    }
  );
});
