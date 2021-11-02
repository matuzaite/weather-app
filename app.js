const apiKey = `d9006e0a51462042590ac54b618a3f5f`;

const getCurrentWeather = () => {
  navigator.geolocation.getCurrentPosition((success) => {
    let lat = success.coords.latitude;
    let lon = success.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        displayCurrentWeather(data);
      });
  });
};

const displayCurrentWeather = (weather) => {
  const currentWeatherContainer = document.querySelector(
    ".current-w-container"
  );

  const infoDiv = document.createElement("div");

  currentWeatherContainer.appendChild(infoDiv);

  infoDiv.innerHTML = `<h2>${weather.timezone}</h2>
  <img id='icon' src='http://openweathermap.org/img/wn/${
    weather.current.weather[0].icon
  }@2x.png' alt="weather-icon">
  <h1>${Math.ceil(weather.current.temp)} \u00B0C</h1>
  <p >${weather.current.weather[0].main}</p>
  <span >${new Date().toDateString()}
  </span><a href="#">Wrong data?</a>`;

  const table = document.createElement("table");

  currentWeatherContainer.appendChild(table);

  table.innerHTML = `
    <tr>
    <td>Wind</td>
    <td >Speed: ${weather.current.wind_speed}m/s</td>
    </tr>
    <tr>
    <td>Cloudiness</td>
    <td >${weather.current.clouds} %</td>
    </tr>
    <tr>
    <td>Pressure</td>
    <td id="pressure-w">${weather.current.pressure} hpa</td>
    </tr>
    <tr>
    <td>Humidity</td>
    <td >${weather.current.humidity} %</td>
    </tr>
    <tr>
    <td>Sunrise</td>
    <td >${new Date(weather.current.sunrise * 1000)
      .toTimeString()
      .substring(0, 5)}</td>
    </tr>
    <tr>
    <td>Sunset</td>
    <td >${new Date(weather.current.sunset * 1000)
      .toTimeString()
      .substring(0, 5)}</td>
    </tr>
    <tr>
    <td>Geo coords</td>
    <td><a href="#" id="coords">[${weather.lat}] [${weather.lon}]</a></td>
    </tr>`;
};

const getHourlyWeather = () => {
  navigator.geolocation.getCurrentPosition((success) => {
    let lat = success.coords.latitude;
    let lon = success.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        displayHourlyWeather(data);
      });
  });
};

const displayHourlyWeather = (weather) => {
  const hourlyContainer = document.querySelector(".hourly-w-container");
  const hourlyTable = document.createElement("table");
  hourlyContainer.appendChild(hourlyTable);
  hourlyTable.innerHTML = `
      <col>
      <colgroup span='3'></colgroup>
      <colgroup span='3'></colgroup>
      <colgroup span='3'></colgroup>
      
    <tr>
      <th colspan='2'>${new Date().toDateString()} Today</th>
      <th colspan='3'></th>
    </tr>
    <tr>
      <td>${new Date(weather.list[0].dt * 1000)
        .toTimeString()
        .substring(0, 5)}</td>
      <td> <img  src="http://openweathermap.org/img/wn/${
        weather.list[0].weather[0].icon
      }@2x.png" alt="logo"></td>
      <td><span class='hourly-w-temp'>${Math.ceil(
        weather.list[0].main.temp
      )}\u00B0C</span> <i>${
    weather.list[0].weather[0].description
  }</i> Humidity: ${weather.list[0].main.humidity}% ${
    weather.list[0].wind.speed
  } m/s</td>
    </tr>
    <tr>
      <td>${new Date(weather.list[1].dt * 1000)
        .toTimeString()
        .substring(0, 5)}</td>
      <td><img src="http://openweathermap.org/img/wn/${
        weather.list[1].weather[0].icon
      }@2x.png" alt="logo"></td>
      <td><span class='hourly-w-temp'>${Math.ceil(
        weather.list[1].main.temp
      )}\u00B0C</span> <i>${
    weather.list[0].weather[0].description
  }</i> Humidity: ${weather.list[1].main.humidity}% ${
    weather.list[1].wind.speed
  } m/s</td>
    </tr>
    <tr>
      <td>${new Date(weather.list[2].dt * 1000)
        .toTimeString()
        .substring(0, 5)}</td>
      <td><img  src="http://openweathermap.org/img/wn/${
        weather.list[2].weather[0].icon
      }@2x.png" alt="logo"></td>
      <td><span class='hourly-w-temp'>${Math.ceil(
        weather.list[2].main.temp
      )}\u00B0C</span> <i>${
    weather.list[2].weather[0].description
  }</i> Humidity: ${weather.list[2].main.humidity}%  ${
    weather.list[2].wind.speed
  } m/s</td>
    <tr>
      <th colspan='2'>${new Date(weather.list[5].dt_txt).toDateString()}</th>
      <th colspan='3'></th>
    </tr>
    <tr>
      <td>${new Date(weather.list[5].dt * 1000)
        .toTimeString()
        .substring(0, 5)}</td>
      <td><img  src="http://openweathermap.org/img/wn/${
        weather.list[5].weather[0].icon
      }@2x.png" alt="logo"></td>
      <td><span class='hourly-w-temp'>${Math.ceil(
        weather.list[3].main.temp
      )}\u00B0C</span> <i>${
    weather.list[5].weather[0].description
  }</i> Humidity: ${weather.list[5].main.humidity}%  ${
    weather.list[0].wind.speed
  } m/s</td>
    </tr>
    <tr>
      <td>${new Date(weather.list[6].dt * 1000)
        .toTimeString()
        .substring(0, 5)}</td>
      <td><img src="http://openweathermap.org/img/wn/${
        weather.list[6].weather[0].icon
      }@2x.png" alt="logo"></td>
      <td><span class='hourly-w-temp'>${Math.ceil(
        weather.list[4].main.temp
      )}\u00B0C</span> <i>${
    weather.list[6].weather[0].description
  }</i> Humidity: ${weather.list[6].main.humidity}% ${
    weather.list[6].wind.speed
  } m/s</td>
    </tr>
    <tr>
      <td>${new Date(weather.list[7].dt * 1000)
        .toTimeString()
        .substring(0, 5)}</td>
      <td><img  src="http://openweathermap.org/img/wn/${
        weather.list[7].weather[0].icon
      }@2x.png" alt="logo"></td>
      <td><span class='hourly-w-temp'>${Math.ceil(
        weather.list[5].main.temp
      )}\u00B0C</span> <i>${
    weather.list[7].weather[0].description
  }</i> Humidity: ${weather.list[7].main.humidity}% ${
    weather.list[7].wind.speed
  } m/s
    </td>
  </tr>`;
};

document.addEventListener("DOMContentLoaded", getHourlyWeather);
document.addEventListener("DOMContentLoaded", getCurrentWeather);
