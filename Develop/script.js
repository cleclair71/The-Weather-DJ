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
var weatherModal = document.querySelector("#myModal");
weatherModal.style.display = "block";
var changeCityBtn = document.querySelector("#change-city");
var closeInputBtn = document.querySelector("#close-input");
closeInputBtn.style.display = "none";
var previewModal = document.querySelector("#preview-modal");
previewModal.style.display = "none" //modal does not show up on load
var previewCloseBtn = document.querySelector("#preview-button");
previewCloseBtn.style.display = "none";
var weatherForecast = document.querySelector(".weather-forecast")
weatherForecast.style.display = "none"
//fardina's code

function displayWeather(city) {
  input.value = "";
  // fetches current weather
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&appid=" + 
    apikey + 
    "&units=imperial"
    )
    .then(function (response) {
      if (response.status !== 200) {
        document.querySelector('#input-error').textContent = 'Please enter a valid city!';
      }
      else {
        document.querySelector('#input-error').textContent = '';
        return response.json(); 
      }
    })
    .then(function (data) {
      if (data === undefined) {
        return;
      }

      //name of the city
      currentCity.innerHTML = data.name;
      //weather description
      currentWeather = data.weather[0].main;
      weather.innerHTML = "Description: " + currentWeather;
      //temperature
      currentTemp.innerHTML = "Temperature: " + Math.floor(data.main.temp) + `&#8457`;
      savedCities.push(city);
      localStorage.setItem("city", JSON.stringify(savedCities));
      //close modal
      weatherModal.style.display = "none";
      //card to display playlist when city is selected
      playlist.style.display = "block";
      renderSearch();
      getPlaylists();
    })
}
  
  //event listener for closing modal on x
  closeInputBtn.addEventListener("click", function () {
    weatherModal.style.display = "none";
  });
    
  let savedCities = JSON.parse(localStorage.getItem("city")) || []
  renderSearch();

  //event listener
  input.addEventListener("keyup", function (event){
    if (event.keyCode == 13){
      searchBtn.click()
    }
  })

  //event listener
  searchBtn.addEventListener("click", function () {
    var searchValue = input.value
    displayWeather(searchValue);
    weatherForecast.style.display = "block"
  });



  //saving searched cities
  function renderSearch(){
    let savedCities = JSON.parse(localStorage.getItem("city")) || [];
    let setSavedCities = [...new Set(savedCities)]
    
    //autocomplete function using previously searched cities using jquery
    $("#city-input").autocomplete({
      source: function(request, response){
        var results = $.ui.autocomplete.filter(setSavedCities, request.term); //gets rid of duplicate searches
        
        response(results.slice(0, 3)) //only shows 3 options in autocomplete
      }
    });

    //event listener to open modal once change city button is selected
    changeCityBtn.addEventListener("click", function () {
      weatherModal.style.display = "block";
      closeInputBtn.style.display = "block";
    });
  }


//jackson's code 
var key = "AIzaSyBDMCgP5fKCMZ7RcyVVZL0XPJuQuuNZqLQ" //Jackson's key
//var key = "AIzaSyCTPCZ0BW1oVO9rOTLhWPKmaxI45OKeyvA" //Hamzah's Key
//var key = "AIzaSyBSZpk2XNTzLPpNRXXODZZ7BxzVoCgkBrs" //Spare Key

function getPlaylists() {
  //Clear any cached playlist previews
  if (previewModal.children.length > 1) {
    for (var i=1; i<previewModal.children.length; i++) {
      previewModal.removeChild(previewModal.children[i]);
    }
  }
  var genre = document.querySelector("#genre-dropdown").value;
  //Set the mood
  switch (currentWeather) {
    case "Rain":
    case "Drizzle":
      mood = "Rainy";
      break;
    case "Clear":
      mood = "Happy";
      break;
    case "Thunderstorm":
    case "Squall":
      mood = "Angsty";
      break;
    case "Snow":
      mood = "Cozy";
      break;
    case "Clouds":
      mood = "Chill";
      break;
    case "Mist":
      mood = "Focus";
      break;
    default:
      mood = "Uncertainty";
  }
  //Set the animated video
  var weathermp4Display = document.getElementById("weathermp4").children[0]; //Get source tag from video
  switch (currentWeather) {
    case "Rain":
      weathermp4Display.setAttribute("src", "Assets/images/rain.mp4");
      break;
    case "Drizzle":
      weathermp4Display.setAttribute("src", "Assets/images/drizzle.mp4");
      break;
    case "Clear":
      weathermp4Display.setAttribute("src", "Assets/images/sunny.mp4");
      break;
    case "Thunderstorm":
    case "Squall":
      weathermp4Display.setAttribute("src", "Assets/images/lightning.mp4");
      break;
    case "Snow":
      weathermp4Display.setAttribute("src", "Assets/images/snow.mp4");
      break;
    case "Clouds":
      weathermp4Display.setAttribute("src", "Assets/images/cloudy.mp4");
      break;
    case "Mist":
      weathermp4Display.setAttribute("src", "Assets/images/mist.mp4");
      break;
    case "Haze":
      weathermp4Display.setAttribute("src", "Assets/images/haze.mp4");
      break;
    case "Smoke":
      weathermp4Display.setAttribute("src", "Assets/images/smoke.mp4");
      break;
    case "Fog":
      weathermp4Display.setAttribute("src", "Assets/images/fog.mp4");
      break;
    case "Sand":
      weathermp4Display.setAttribute("src", "Assets/images/sand.mp4");
      break;
    case "Dust":
      weathermp4Display.setAttribute("src", "Assets/images/dust.mp4");
      break;
    default: //Ash and tornado
      weathermp4Display.setAttribute("src", "Assets/images/danger.mp4");
  }
  weathermp4Display.parentElement.style.display = "block"; //Display video

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
    var playlistTitle = playlistData[i].snippet.title;
    //Limit playlist titles to 120 characters for long titles
    if (playlistTitle.length > 120) {
      playlistTitle = playlistTitle.substring(0, 120);
      tempTitle = playlistTitle.split(" ");
      playlistTitle = "";
      for (var j=0; j<tempTitle.length - 1; j++) {
        playlistTitle += tempTitle[j] + " ";
      }
      playlistTitle += "...";
    }
    //Create a div to contain each playlist
    var playlistEl = document.createElement("div");
    playlistEl.innerHTML = 
      '<div class="playlist-card">' +
        '<h3>' + playlistTitle + '</h3>' +
        '<button class="preview-button" data-playlistid = ' + playlistData[i].id.playlistId + '>Preview Playlist</button>' +
      '</div>' +
      '<a href=' + 'https://www.youtube.com/playlist?list=' + playlistData[i].id.playlistId + ' target="_blank">' +
        '<img src=' + playlistData[i].snippet.thumbnails.high.url + '>' +
      '</a>';
    
    playlist.appendChild(playlistEl);
    
  }
}

$(playlist).on("click", ".preview-button", function (event) {
  previewModal.style.display = "block" //shows modal when previe button is clicked
  getPlaylistItems(event.target.dataset.playlistid);
});

$("#preview-modal").on("click", ".close", function() {
  previewModal.style.display = "none" //gets rid of  modal when close button is clicked
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
  //Clear any cached playlist previews
  if (previewModal.children.length > 1) {
    for (var i=1; i<previewModal.children.length; i++) {
      previewModal.removeChild(previewModal.children[i]);
    }
  }
  for (var i=0; i<Object.keys(playlistData.items).length; i++) {
    if (playlistData.items[i].snippet.title == "Deleted video") {
      continue;
    }
    var playlistTitle = playlistData.items[i].snippet.title;
    //Limit playlist titles to 120 characters for long titles
    if (playlistTitle.length > 120) {
      playlistTitle = playlistTitle.substring(0, 120);
      tempTitle = playlistTitle.split(" ");
      playlistTitle = "";
      for (var j=0; j<tempTitle.length - 1; j++) {
        playlistTitle += tempTitle[j] + " ";
      }
      playlistTitle += "...";
    }
    var previewContentEl = document.createElement("div");
    previewContentEl.setAttribute("class", "modal-content");
    previewContentEl.innerHTML = 
      '<div>' +
        '<h3>' + playlistData.items[i].snippet.title + '</h3>' +
      '<a href=' + 'https://www.youtube.com/watch?v=' + playlistData.items[i].snippet.resourceId.videoId + "&list=" + playlistid + ' target="_blank">' +
        '<img src=' + playlistData.items[i].snippet.thumbnails.high.url + '>' +
      '</a>';

    previewModal.appendChild(previewContentEl);
  }
}
//rajvir's code