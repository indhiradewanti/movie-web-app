const router = require("express").Router();
let TVSeries = require('./TVSeries');
let movie = require('./movie');

router.get('/', function (req, res) {
      res.status(200).json({
            msg: 'helloo'
      })
})
router.use('/tv-series', TVSeries)
router.use('/movies', movie)

module.exports = router