

//variables
var apikey = "2699b95b9f3bb5523129bfe9fb508790";
var searchBtn = document.querySelector("#submit-selection");
var playlist = document.querySelector(".displayed-playlists");
playlist.style.display = "none";
var input = document.querySelector("#city-input");
var currentTemp = document.querySelector("#temperature");
var currentCity = document.querySelector("#city-name");
var weather = document.querySelector("#weather-description");
var currentWeather; //Initialized in displayWeather for use in getPlaylists()
var weatherModal = document.querySelector("#myModal")
weatherModal.style.display = "block"
var previewModal = document.querySelector("#preview-modal");
var changeCityBtn = document.querySelector("#change-city");
var previewCloseBtn = document.querySelector("#close");
previewCloseBtn.style.display = "none";
//fardina's code
//autocomplete function using previously searched cities
async function displayWeather(city) {
  input.value = "";
  //card to display playlist when city is selected
    playlist.style.display = "block";
    // fetches current weather
    await fetch(
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
            //name of the city
            currentCity.innerHTML = data.name;
            //weather description
            currentWeather = data.weather[0].main;
            weather.innerHTML = "Description: " + currentWeather;
            //temperature
            currentTemp.innerHTML = "Temperature: " + Math.floor(data.main.temp) + `&#8457`;
        })
}
let savedCities = JSON.parse(localStorage.getItem("city")) || []

//event listener
searchBtn.addEventListener("click", async function () {
  //close modal on submit
  weatherModal.style.display = "none";
  var searchValue = input.value 
  await displayWeather(searchValue);
  savedCities.push(searchValue);
  localStorage.setItem("city", JSON.stringify(savedCities));
  renderSearch()
  getPlaylists();
});
localStorage.clear();

//saving searched cities
function renderSearch(){
  var ul = document.querySelector(".city-list")
  for (var i =0; i< savedCities.length; i++) {
    var storedCities = savedCities[i]
    var storedList = document.createElement("li")
    storedList.classList.add("stored-list")
    storedList.textContent = storedCities
    // to display weather for stored list cities
    storedList.addEventListener("click", function(){
      displayWeather(storedList.textContent)
    })
  }
  //append list to ul element
  ul.appendChild(storedList)
}

//event listener to open modal once change city button is selected
changeCityBtn.addEventListener("click", function (){
  weatherModal.style.display = "block";
})

//jackson's code 
var key = "AIzaSyBDMCgP5fKCMZ7RcyVVZL0XPJuQuuNZqLQ" //Jackson's key
//var key = "AIzaSyCTPCZ0BW1oVO9rOTLhWPKmaxI45OKeyvA" //Hamzah's Key

function getPlaylists() {
  var genre = document.querySelector("#genre-dropdown").value;
  switch (currentWeather) {
    case "Rain":
    case "Drizzle":
      mood = "Rainy";
      break;
    case "Clear":
      mood = "Happy";
      break;
    case "Thunderstorm":
      mood = "Angsty";
      break;
    case "Snow":
      mood = "Cozy";
      break;
    case "Clouds":
      mood = "Chill";
    default:
      mood = "Focus"
  }

  /* 
  Call to Youtube's API to get 5 playlist results using 'mood' based on the weather and 'genre' 
  from the user's selection to form a search along the lines of 'playlist music sad country' 
  */
  var playlistData = [];   
    fetch ("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=playlist&q=music " + mood + " " + genre + "&key=" + key)
      .then (function (response) {
        return response.json();
      })
      .then (function (data) {
        for (var i=0; i<5; i++) {
          playlistData.push(data.items[i]);
        }
        showPlaylists(playlistData);
    });
}

//Display each playlist title and image (clickable link to source on the image)
function showPlaylists(playlistData) {
  //Delete any children if they exist to clear previously displayed playlists
  if (playlist.children.length > 1) {
    for (var i=0; i<5; i++) {
      playlist.children[1].remove();
    }
  }
  for (var i=0; i<5; i++) {
    var playlistEl = document.createElement("div");
    //Create a div to contain each playlist
    playlistEl.innerHTML = 
      '<div class="playlist-card">' +
        '<h3>' + playlistData[i].snippet.title + '</h3>' +
        '<button class="preview-button" data-playlistid = ' + playlistData[i].id.playlistId + '>Preview Playlist</button>' +
      '</div>' +
      '<a href=' + 'https://www.youtube.com/playlist?list=' + playlistData[i].id.playlistId + '>' +
        '<img src=' + playlistData[i].snippet.thumbnails.high.url + '>' +
      '</a>';
    
    playlist.appendChild(playlistEl);
    
  }
}

$(playlist).on("click", ".preview-button", function (event) {
  getPlaylistItems(event.target.dataset.playlistid);
});

$("#preview-modal").on("click", "#close", function() {
  previewCloseBtn.style.display = "none";
  $(".modal-content").remove();
 })


//Get each song within the playlist when user clicks to expand
function getPlaylistItems(playlistId) {
  fetch ("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlistId + "&fields=items/snippet(title, thumbnails, resourceId)&key=" + key)
    .then (function (response) {
      return response.json();
    })
    .then (function (data) {
      showPlaylistItems(data, playlistId);
  });
}

//Display each song of a given playlist within a collapsible div
function showPlaylistItems(playlistData, playlistid) { 
  previewCloseBtn.style.display = "block";
  for (var i=0; i<Object.keys(playlistData.items).length; i++) {
    if (playlistData.items[i].snippet.title == "Deleted video") {
      continue;
    }
    console.log(playlistData.items[i]);
    var previewContentEl = document.createElement("div");
    previewContentEl.setAttribute("class", "modal-content");
    previewContentEl.innerHTML = 
      '<div>' +
        '<h3>' + playlistData.items[i].snippet.title + '</h3>' +
      '<a href=' + 'https://www.youtube.com/watch?v=' + playlistData.items[i].snippet.resourceId.videoId + "&list=" + playlistid + '>' +
        '<img src=' + playlistData.items[i].snippet.thumbnails.high.url + '>' +
      '</a>';

    previewModal.appendChild(previewContentEl);
  }
}
//rajvir's code
        