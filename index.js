
let now = new Date();

let time = document.querySelector("#time");


      let date = now.getDate();
      let hours = now.getHours();
      let minutes = now.getMinutes();
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



function displayWeather(response) {
document.querySelector("#todayTemperaturePeak").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
console.debug(response);
let current  = response.data.weather[0].main;

 let h6 = document.querySelector("#currently");
 h6.innerHTML = `Current weather in ${response.data.name} is best described as "${current}"`;
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


function convertCToF(celsius) {
  return (celsius * 9) / 5 + 32;

} 
function convertFToC(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;

}
function changeTemperatureUnit(event) {
let highest = document.querySelector("#todayTemperaturePeak");

let newTemperature;

if (event.target.checked) {
  newTemperature = convertCToF(highest.innerHTML);

} else {
  newTemperature = convertFToC(highest.innerHTML);

}
highest.innerHTML = Math.round(newTemperature);


}

let toggle = document.querySelector("#flexSwitchCheckChecked");
toggle.addEventListener("change", changeTemperatureUnit);

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
