const express = require('express')
const router = express.Router()

const controller = require('../controllers/posts')

router.get('/', controller.index)
router.get('/category/:category', controller.indexByCategory)
router.get('/create', controller.create)
router.post('/store', controller.store)
router.get('/edit/:category/:id', controller.edit)
router.post('/update/:category/:id', controller.update)
router.get('/destroy/:category/:id', controller.destroy)

module.exports = router
