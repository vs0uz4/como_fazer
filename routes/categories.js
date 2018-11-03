const express = require('express')
const router = express.Router()

const api = require('../api')

router.get('/', async(req, res) => {
    const categories = await api.list('categories')
    res.render('categories/index', { categories: categories })
})

router.get('/create', (req, res) => {
    res.render('categories/create')
})

router.post('/store', async(req, res) => {
    await api.create('categories', {
        name: req.body.name
    })
    res.redirect('/categories')
})

router.get('/edit/:id', async(req, res) => {
    const category = await api.get('categories', req.params.id)
    res.render('categories/edit', {
        category
    })
})

router.post('/update/:id', async(req, res) => {
    await api.update('categories', req.params.id, {
        name: req.body.name
    })
    res.redirect('/categories')
})

router.get('/destroy/:id', async(req, res) => {
    await api.destroy('categories', req.params.id)
    res.redirect('/categories')
})

module.exports = router
