const router = require("express").Router();
let TVSeries = require('./TVSeries');
let movie = require('./movie');
const Controller = require("../controllers");

router.get('/', Controller.getAll)
router.use('/tv-series', TVSeries)
router.use('/movies', movie)

module.exports = router