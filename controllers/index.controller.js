const axios = require('axios').default;


async function index(req, res, next) {

    await axios.get(`http://api.weatherapi.com/v1/current.json`, {
        params: {
            key: process.env.API_KEY,
            q: "colombia"
        }
    })
        .then(resp => {
            res.send(resp.data.current.temp_c);
        })
        .catch(() => {
            res.status(500);
            res.send("Something occurred, Try again.");
        })
        

}

module.exports = {
    index
}