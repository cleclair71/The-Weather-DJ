//fardina's code
//jackson's code 
var key = "AIzaSyBDMCgP5fKCMZ7RcyVVZL0XPJuQuuNZqLQ"

//Hard coded values until dynamic input from the HTML is implemented
var mood = "happy";
var genre = "pop";

//Call to Youtube's API to get 10 playlist results using 'mood' based on the weather and 'genre' from the user's selection
fetch ('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=playlist&q=' + mood + ' ' + genre + '&key=' + key)
  .then (function (response) {
    return response.json();
  })
  .then (function (data) {
    getPlaylists(data);
  });

//Takes the queried playlists and puts the titles and thumbnail images into an array to be processed for display in the HTML
function getPlaylists(data) {
  var videos = data.items;
  var titles = [];
  var thumbnails = [];
  for (video of videos) {
    titles.push(video.snippet.title);
    thumbnails.push(video.snippet.thumbnails.high.url);
  }
}

//rajvir's code