const router = require("express").Router();
const TVSeriesController = require("../controllers/TVSeries");

router.get('/', function (req, res) {
      res.status(200).json({
            msg: 'helloo'
      })
})
router.get('/tv-series', TVSeriesController.getAll)
router.get('/tv-series/:id', TVSeriesController.getOne)
router.post('/tv-series', TVSeriesController.createData)
router.put('/tv-series/:id', TVSeriesController.updateData)
router.delete('/tv-series/:id', TVSeriesController.delete)

module.exports = router