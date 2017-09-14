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

module.exports = { getMovies, addMovie };

