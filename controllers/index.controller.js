const axios = require('axios').default;


async function index(req, res, next) {

    //Get genres
    var genres = await getGenres();

    //Get Movies
    await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        params: {
            include_adult: false,
            include_video: true,
            language: "es-ES",
            page: 1,
            sort_by: "popularity.desc"
        }

    })
        .then(resp => {
            if (resp.status == 200) {
                res.render('index', { "movies": resp.data.results, "genres" : genres });
            } else {
                throw new Error("Something went wrong, try again.");
            }
        })
        .catch(err => {
            res.status(500);
            res.send(err.message);
        })


}

async function genre(req, res){
    //Get genres
    var genres = await getGenres();

    //Get Movies
    await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        },
        params: {
            include_adult: false,
            include_video: true,
            language: "es-ES",
            page: 1,
            sort_by: "popularity.desc",
            with_genres:req.params.id
        }

    })
        .then(resp => {
            if (resp.status == 200) {
                res.render('index', { "movies": resp.data.results, "genres" : genres });
            } else {
                throw new Error("Something went wrong, try again.");
            }
        })
        .catch(err => {
            res.status(500);
            res.send(err.message);
        })


}

async function getGenres(){
    //Initialize empty genres array
    var genres = [];

    await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
            language: 'es'
        },
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }).then( resp => {
        genres = resp.data.genres;
    });

    return genres;
}

module.exports = {
    index,
    genre
}