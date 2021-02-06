// ApiDoc = https://openweathermap.org/current
const welcome = document.querySelector(".welcome-status");
const main = document.querySelector(".weather-status");

//Handle Search button Event
document.querySelector(".btn").addEventListener("click", function () {
  const city = document.querySelector(".city-input").value;

  //Get Weather info from API
  async function getWeather(city) {
    const apiKey = "880f7eac8098a7054bd4368f35745d88";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
  }

  getWeather(city)
    .then((data) => {
      //Update Icon in the UI
      const icon = data.weather[0].icon;
      document
        .querySelector(".icon")
        .setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${icon}@2x.png`
        );

      //Update city in the Ui
      const city = data.name;
      document.querySelector(".cityName").innerText = city;

      //Update Weather condition in the Ui
      const description = data.weather[0].description;
      document.querySelector(".condition").innerText = description;

      //Update temperature in the Ui
      const temp = (parseFloat(data.main.temp) - 273.15).toFixed(2);
      document.querySelector(".temp").innerText = temp;

      document.querySelector(".city-input").value = "";
      welcome.style.display = "none";
      main.style.display = "block";
    })
    .catch((err) => {
      alert("Something went wrong! Please try again.");
      welcome.style.display = "block";
      main.style.display = "none";
      document.querySelector(".city-input").value = "";
    });
});
