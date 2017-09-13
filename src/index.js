const getMovies = require('./getMovies.js');

getMovies().then((movies) => {
  let movieApp = document.getElementById("movieApp");
  let movieAppHTML = "<dl>";
  movies.forEach((movie) => {
      movieAppHTML += `<dt>${movie.title}</dt><dd>Rating: `
    for (let i =0; i < movie.rating; i++) {
        movieAppHTML += '&#9733;';
      } movieAppHTML += '</dd>';
  });
  movieAppHTML += "</dl>";
  movieApp.innerHTML = movieAppHTML;
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
});

