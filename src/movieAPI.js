const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json());
};

const addMovie = (newMovie) => {
    let reqOtions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: newMovie.title,
            rating: newMovie.rating
        })
    };

    let req = new Request("/api/movies", reqOtions);

    return fetch(req);
};

const updateMovie = (movieID, infoToUpdate) => {
    let reqOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: infoToUpdate.title,
            rating: infoToUpdate.rating
        })
    };

    let req = new Request(`/api/movies/${movieID}`, reqOptions);

    return fetch(req);
};

const deleteMovie = (movieID) => {
    let reqOptions = {
        method: "DELETE"
    };
    let req = new Request(`/api/movies/${movieID}`, reqOptions);

    return fetch(req);
};

module.exports = { getMovies, addMovie, updateMovie, deleteMovie };

