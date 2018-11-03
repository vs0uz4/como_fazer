const express = require('express')
const router = express.Router()

const controller = require('../controllers/categories')

router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/store', controller.store)
router.get('/edit/:id', controller.edit)
router.post('/update/:id', controller.update)
router.get('/destroy/:id', controller.destroy)

module.exports = router
