const router = require("express").Router();
const MovieController = require("../controllers/movie");

router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getOne)
router.post('/', MovieController.createData)
router.put('/:id', MovieController.updateData)
router.delete('/:id', MovieController.delete)

module.exports = router