var express = require('express');
var router = express.Router();

// Controllers
const indexController = require('../controllers/index.controller');

/* GET home page. */
router.get('/', indexController.index);
router.get('/genero/:id', indexController.genre);
router.get('/detalle/:id', indexController.details);

module.exports = router;
