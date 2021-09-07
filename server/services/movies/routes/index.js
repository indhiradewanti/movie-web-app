const router = require("express").Router();
const MovieController = require("../controllers/movie");

router.get('/', function (req, res) {
      res.status(200).json({
            msg: 'helloo'
      })
})

router.get('/movies', MovieController.getAll)
router.get('/movies/:id', MovieController.getOne)
router.post('/movies', MovieController.createData)
router.put('/movies/:id', MovieController.updateData)
router.delete('/movies/:id', MovieController.delete)

module.exports = router