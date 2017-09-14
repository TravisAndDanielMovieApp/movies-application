const movieAPI = require('./movieAPI.js');

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

        document.getElementById('add-button').style.display = "inline-block";
        document.getElementById('update-button').style.display = "inline-block";
        document.getElementById('back-button').style.display = "none";
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
    });
}

function addMovie(evt) {
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

function displayMovieForm(method, title, rating) {
    let appContainer = document.getElementById('movieApp');
    let movieForm = `<form name="${method}Movie">
    <label for="title">Title: </label>
    <input name="title" type="text" id="title" placeholder="Movie Title">

    <h4>Rating: </h4>
    <input type="radio" name="rating" id="rating-1" value="1">
    <label for="rating-1">1</label><br>
    <input type="radio" id="rating-2" name="rating" value="2">
    <label for="rating-2">2</label><br>
    <input type="radio" id="rating-3" name="rating" value="3">
    <label for="rating-3">3</label><br>
    <input type="radio" id="rating-4" name="rating" value="4">
    <label for="rating-4">4</label><br>
    <input type="radio" id="rating-5" name="rating" value="5">
    <label for="rating-5">5</label><br>

    <button id="${method}-movie-button" type="submit">${method} Movie</button>
  </form>`;
    appContainer.innerHTML = movieForm;
    if (method ==="update") {
        document.getElementById(`rating-${rating}`).checked = true;
        document.forms.updateMovie.title.value = title;
    }
}

function displayAddMovieForm() {

    displayMovieForm("add");

    document.getElementById('add-button').style.display = 'none';
    document.getElementById('back-button').style.display = 'inline-block';
    document.getElementById('add-movie-button').addEventListener('click', addMovie);
}

document.getElementById('add-button').addEventListener('click', (e) => {
    e.preventDefault();
    displayAddMovieForm();
});

document.getElementById('update-button').addEventListener('click', (e) => {
    e.preventDefault();
    displayUpdateMovieForm();
});

document.getElementById('back-button').addEventListener('click', getMovieList);

function updateMovie(movieID) {
    let form = document.forms.updateMovie;
    let existingMovie = {
        title: form.title.value,
        rating: form.rating.value,
    };

    movieAPI.updateMovie(movieID, existingMovie).then(() => getMovieList());
}

function displayUpdateMovieForm() {
    movieAPI.getMovies().then(movies => {
        let appContainer = document.getElementById('movieApp');
        let selectOptions = "";
        movies.forEach(movie => {
            selectOptions += `<option value="${movie.id}" data-rating="${movie.rating}">${movie.title}</option>`;
        });


        let updateMovieForm = `<form name="updateMovie">
             <label for="title">Title: </label>
             <select name="movieUpdate" id="movieUpdate">
             <option>Select Movie</option>
                ${selectOptions}
            </select>
            </form>`;

        document.getElementById('update-button').style.display = 'none';
        document.getElementById('add-button').style.display = 'inline-block';
        document.getElementById('back-button').style.display = 'inline-block';
        appContainer.innerHTML = updateMovieForm;

        document.getElementById("movieUpdate").addEventListener("change", () => {
            let select = document.forms.updateMovie.movieUpdate;
            let selectedOption = (select[select.selectedIndex]);
            let rating = selectedOption.getAttribute("data-rating");

            displayMovieForm("update", selectedOption.innerText, rating);

            document.getElementById('update-movie-button').addEventListener("click", (ev) => {
                ev.preventDefault();
                updateMovie(selectedOption.value);
            });
        });
            // appContainer.innerHTML += `<button id="test">Test</button>`;
            // document.getElementById('test').addEventListener('click', updateMovie);
    });

}

getMovieList();