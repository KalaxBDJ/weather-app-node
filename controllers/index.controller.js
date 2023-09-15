const axios = require('axios').default;


function index(req, res, next) {


    axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        headers : {
            Authorization : `Bearer ${process.env.ACCESS_TOKEN}`
        },
        params : {
            include_adult:false,
            include_video:true,
            language:"es-ES",
            page:1,
            sort_by:"popularity.desc"
        }

    })
        .then(resp => {
            if(resp.status == 200) {
                res.render('index', {"movies": resp.data.results});
            } else {
                throw new Error("Something went wrong, try again.");
            }
        })
        .catch(err  => {
            res.status(500);
            res.send(err.message);
        })
        

}

module.exports = {
    index
}