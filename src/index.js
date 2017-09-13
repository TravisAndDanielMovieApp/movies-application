const movieAPI = require('./getMovies.js');

function getMovieList() {
    movieAPI.getMovies().then((movies) => {
        let movieApp = document.getElementById("movieApp");
        let movieAppHTML = "<dl>";
        movies.forEach((movie) => {
            movieAppHTML += `<dt>${movie.title}</dt><dd>Rating: `
            for (let i = 0; i < movie.rating; i++) {
                movieAppHTML += '&#9733;';
            }
            movieAppHTML += '</dd>';
        });
        movieAppHTML += "</dl>";
        movieApp.innerHTML = movieAppHTML;
        document.getElementById("buttons").innerHTML = `
        <button id="addButton">Add New Movie</button>
        <button>Edit Existing Movie</button>
        <button>Delete Movie</button>`;
        document.getElementById("addButton").addEventListener("click", addNewMovie);
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
    });
}

function addNewMovie () {
    alert("add movie");
}

getMovieList();
// movieAPI.addMovie()
//     .then(res => res.json().then((movie) => console.log(movie)));
