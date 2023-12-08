const apiKey = "YOUR API KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let input = document.querySelector("input");
let button = document.querySelector("button");
let img = document.querySelector(".weather-icon");
let error = document.querySelector(".error");
let weather = document.querySelector(".weather");

button.addEventListener("click", () => {
  getWeather(input.value);
});

async function getWeather(city) {
  let response = await axios.get(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    weather.style.display = "none";
    error.style.display = "block";
  } else {
    document.querySelector("h1").innerText = Math.round(response.data.main.temp) + "°c";
    document.querySelector("h2").innerText = response.data.name;
    document.querySelector(".humidity").innerText = response.data.main.humidity + "%";
    document.querySelector(".wind").innerText = response.data.wind.speed + " Km/h";

    if (response.data.weather[0].main === "Clouds") {
      img.src = "images/clouds.png";
    } else if (response.data.weather[0].main === "Clear") {
      img.src = "images/clear.png";
    } else if (response.data.weather[0].main === "Drizzle") {
      img.src = "images/drizzle.png";
    } else if (response.data.weather[0].main === "Mist") {
      img.src = "images/mist.png";
    } else if (response.data.weather[0].main === "Rain") {
      img.src = "images/rain.png";
    } else if (response.data.weather[0].main === "Snow") {
      img.src = "images/snow.png";
    }

    input.value = "";
  }
  error.style.display = "none";
  weather.style.display = "block";
}
