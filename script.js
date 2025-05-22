let currCity = "Lahore";
let units = "metric";

const API_KEY = "64f60853740a1ee3ba20d0fb595c97d5";

const city = document.querySelector(".weather__city");
const datetime = document.getElementById("currentTime");
const weather__forecast = document.querySelector(".weather__forecast");
const weather__temperature = document.querySelector(".weather__temperature");
const weather__icon = document.querySelector(".weather__icon");
const weather__minmax = document.querySelector(".weather__minmax");
const weather__realfeel = document.querySelector(".weather__realfeel");
const weather__humidity = document.querySelector(".weather__humidity");
const weather__wind = document.querySelector(".weather__wind");
const weather__pressure = document.querySelector(".weather__pressure");

document.querySelector(".weather__search").addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector(".weather__searchform");
  currCity = search.value;
  getWeather();
  search.value = "";
});

// Unit toggle handlers
document
  .querySelector(".weather_unit_celsius")
  .addEventListener("click", () => {
    if (units !== "metric") {
      units = "metric";
      getWeather();
      toggleActiveUnit("celsius");
    }
  });

document
  .querySelector(".weather_unit_fahrenheit")
  .addEventListener("click", () => {
    if (units !== "imperial") {
      units = "imperial";
      getWeather();
      toggleActiveUnit("fahrenheit");
    }
  });

function toggleActiveUnit(unit) {
  document.querySelector(".weather_unit_celsius").classList.remove("active");
  document.querySelector(".weather_unit_fahrenheit").classList.remove("active");
  document.querySelector(`.weather_unit_${unit}`).classList.add("active");
}

// Theme switch
document.getElementById("themeSwitch").addEventListener("change", () => {
  document.body.classList.toggle("light");
});


function convertCountryCode(country) {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}


function setDynamicBackground(city, weather) {
  const key = `${city.toLowerCase()}-${weather.toLowerCase()}`;

  const bg = backgrounds[key] || backgrounds["default"];
  document.body.style.backgroundImage = bg;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
}

function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
      weather__temperature.innerHTML = `${Math.round(data.main.temp)}&#176${
        units === "metric" ? "C" : "F"
      }`;
      weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon">`;
      weather__minmax.innerHTML = `<p>Min: ${Math.round(
        data.main.temp_min
      )}&#176</p><p>Max: ${Math.round(data.main.temp_max)}&#176</p>`;
      weather__realfeel.innerHTML = `${Math.round(data.main.feels_like)}&#176`;
      weather__humidity.innerHTML = `${data.main.humidity}%`;
      weather__wind.innerHTML = `${data.wind.speed} ${
        units === "metric" ? "m/s" : "mph"
      }`;
      weather__pressure.innerHTML = `${data.main.pressure} hPa`;

    
      setDynamicBackground(data.name, data.weather[0].main);
    });
}

getWeather();
