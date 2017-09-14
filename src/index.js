const movieAPI = require('./getMovies.js');

function getMovieList() {
    movieAPI.getMovies().then((movies) => {
        let movieApp = document.getElementById("movieApp");
        let movieAppHTML = "<table><tr><th>Title</th><th>Rating</th></tr>";
        movies.forEach((movie) => {
            let stars = "";

            for (let i = 0; i < movie.rating; i++) {
                stars += '&#9733;';
            }

            movieAppHTML += `<tr><td>${movie.title}</td><td>${stars}</td><td><a href="#">Delete</a></td></tr>`;
        });
        movieAppHTML += "</table>";
        movieApp.innerHTML = movieAppHTML;

        document.getElementById('buttons').style.display = "block";
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
    });
}

function addMovie (evt) {
    let form = document.forms.addMovie;
    let newMovie = {
        title: form.title.value,
        rating: form.rating.value,
    };

    evt.preventDefault();

    movieAPI.addMovie(newMovie).then(response => {
        evt.target.removeEventListener('click', addMovie);
        getMovieList();
    });
}

function displayAddMovieForm() {
    let appContainer = document.getElementById('movieApp');
    let addMovieForm = `<form name="addMovie">
    <label for="title">Title: </label>
    <input type="text" id="title" placeholder="New Movie">

    <h4>Rating: </h4>
    <input type="radio" name="rating" id="rating-0" value="1">
    <label for="rating-0">1</label>
    <input type="radio" id="rating-1" name="rating" value="2">
    <label for="rating-1">2</label>
    <input type="radio" id="rating-2" name="rating" value="3">
    <label for="rating-2">3</label>
    <input type="radio" id="rating-3" name="rating" value="4">
    <label for="rating-3">4</label>
    <input type="radio" id="rating-4" name="rating" value="5">
    <label for="rating-4">5</label>

    <button id="add-movie-button" type="submit">Add Movie</button>
  </form>`;

    appContainer.innerHTML = addMovieForm;

    document.getElementById('add-button').style.display = 'none';
    document.getElementById('add-movie-button').addEventListener('click', addMovie);
}

document.getElementById('add-button').addEventListener('click', (e) => {
    e.preventDefault();
    displayAddMovieForm();
});

getMovieList();
