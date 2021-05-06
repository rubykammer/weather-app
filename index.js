
let now = new Date();

let time = document.querySelector("#time");


      let date = now.getDate();
      let hours = now.getHours();
      let minutes = now.getMinutes() < 10 ? "0"+ now.getMinutes(): now.getMinutes() ;
      let year = now.getFullYear();

      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let day = days[now.getDay()];

      let months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = months[now.getMonth()];
  
  time.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

  function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    return days[day];

  }


function displayForecast(response) {
 let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (0< index && index < 6) {
    forecastHTML =
      forecastHTML +
      `
  <div class="custom-day-column">
            ${formatDay(forecastDay.dt)}
            <br />
            <img
              src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            />
            <br />
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span> /
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}°</span>
          </div>

  `;
  }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);


}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "1fc3284d9435bcbb2a6f01ef23cf7980";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
document.querySelector("#todayTemperaturePeak").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
console.debug(response);
let current  = response.data.weather[0].main;

let h6 = document.querySelector("#currently");
 h6.innerHTML = `Current weather in ${response.data.name} is best described as "${current}"`;
 
 let iconElement = document.querySelector("#current-weather");
 iconElement.setAttribute(
   "src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
 );

 getForecast(response.data.coord);
 
}

function searchCity(city){
let apiKey = "1fc3284d9435bcbb2a6f01ef23cf7980";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayWeather);
}

function showCity(event){
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  searchCity(city);
  }
 
 

 

let city = document.querySelector("#cityForm");
city.addEventListener("submit", showCity);






function searchLocation(position) {
 let apiKey = "1fc3284d9435bcbb2a6f01ef23cf7980";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayWeather);
}
 
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);


searchCity("Berlin");
displayForecast();
