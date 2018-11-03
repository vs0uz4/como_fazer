const api = require('../api')

const index = async(req, res) => {
    const categories = await api.list('categories')
    res.render('categories/index', { categories: categories })
} 

const create = (req, res) => {
    res.render('categories/create')
}

const store = async(req, res) => {
    await api.create('categories', {
        name: req.body.name
    })
    res.redirect('/categories')
}

const edit = async(req, res) => {
    const category = await api.get('categories', req.params.id)
    res.render('categories/edit', {
        category
    })
}

const update = async(req, res) => {
    await api.update('categories', req.params.id, {
        name: req.body.name
    })
    res.redirect('/categories')
}

const destroy = async(req, res) => {
    await api.destroy('categories', req.params.id)
    res.redirect('/categories')
}

module.exports = {
    index, create, store, edit, update, destroy
}
