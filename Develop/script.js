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
    //card to display when city is selected
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
        })
}
searchBtn.addEventListener("click", function () {
    var searchValue = input.value 
    displayWeather(searchValue);
});


    

//jackson's code 
//rajvir's code