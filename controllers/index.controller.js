const axios = require('axios').default;
const title = "Peliculas App";

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
                res.render('index', { 
                    "movies": resp.data.results, 
                    "genres" : genres,
                    title
                });
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
                res.render('index', { 
                    "movies": resp.data.results, 
                    "genres" : genres,
                    title
                });
            } else {
                throw new Error("Something went wrong, try again.");
            }
        })
        .catch(err => {
            res.status(500);
            res.send(err.message);
        })


}

async function details(req, res){
    //Get genres
    var genres = await getGenres();

    await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}`,{
        params : {
            language:"es-ES"
        },
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }).then(resp => {
        if(resp.status == 200) {
            res.render('details', {"movie" : resp.data, "genres": genres});
        } else {
            throw new Error('Opss, No pudimos encontrar información sobre esta pelicula.');
        }
    }).catch(err => {
        res.render('error', {"message": 'Opss, No pudimos encontrar información sobre esta pelicula.', "genres": genres});
    });

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
    genre,
    details
}