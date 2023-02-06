//variables
var apikey = "2699b95b9f3bb5523129bfe9fb508790";
var searchBtn = document.querySelector("#submit-city");
var playlist = document.querySelector(".displayed-playlists");
playlist.style.display = "none";
var input = document.querySelector("#city-input");
var currentTemp = document.querySelector("#temperature");
var currentCity = document.querySelector("#city-name");
var weather = document.querySelector("#weather-description");
//fardina's code
function displayWeather(city) {
    playlist.style.display = "block";
    //card to display playlist when city is selected
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + 
        city + 
        "&appid=" + 
        apikey + 
        "&units=imperial"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //name of the city
            console.log("city", data.name);
            currentCity.innerHTML = data.name;
            //weather description
            console.log("description", (data.weather[0].main));
            weather.innerHTML = "Description: " + (data.weather[0].main);
            //temperature
            console.log("temperature",(data.main.temp))
            currentTemp.innerHTML = "Temperature: " + Math.floor(data.main.temp) + `&#8457`;
        })
}

let savedCities = JSON.parse(localStorage.getItem("city")) || []

//event listener
searchBtn.addEventListener("click", function () {
    var searchValue = input.value 
    displayWeather(searchValue);
    savedCities.push(searchValue);
    localStorage.setItem("city", JSON.stringify(savedCities));
});
localStorage.clear()




    

//jackson's code 
//rajvir's code