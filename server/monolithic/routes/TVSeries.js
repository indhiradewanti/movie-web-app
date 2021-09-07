const router = require("express").Router();
const TVSeriesController = require("../controllers/TVSeries");

router.get('/', TVSeriesController.getAll)
router.get('/:id', TVSeriesController.getOne)
router.post('/', TVSeriesController.createData)
router.put('/:id', TVSeriesController.updateData)
router.delete('/:id', TVSeriesController.delete)

module.exports = router