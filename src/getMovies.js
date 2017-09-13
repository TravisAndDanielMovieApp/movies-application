const getMovies = () => {
    return fetch('/api/movies')
        .then(response => response.json());
};

const addMovie = (newMovie) => {


    let reqOtions = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify( {
            "title": "Star Wars: The Force Awakens",
            "rating": 2
        } )
    };
    let req = new Request("/api/movies", reqOtions);
console.log(req);
    return fetch(req);
};

module.exports = { getMovies, addMovie };

