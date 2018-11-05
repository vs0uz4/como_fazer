const api = require('../api')

const index = async(req, res) => {
    const postsOfCategories = await api.list('posts')
    res.render('posts/index', { postsOfCategories })
} 

const indexByCategory = async(req, res) => {
    const category = await api.get('categories', req.params.category)
    const posts = await api.list(`posts/${category.id}`)
    res.render('posts/indexByCategory', { posts, category })
} 

const create = async(req, res) => {
    const categories = await api.list('categories')
    res.render('posts/create', { categories })
}

const store = async(req, res) => {
    await api.create(`posts/${req.body.category}`, {
        title: req.body.title,
        content: req.body.content
    })
    res.redirect(`/posts/category/${req.body.category}`)
}

const edit = async(req, res) => {
    const category = await api.get('categories', req.params.category)
    const post = await api.get(`posts/${req.params.category}`, req.params.id)
    res.render('posts/edit', {
        post, category
    })
}

const update = async(req, res) => {
    await api.update(`posts/${req.params.category}`, req.params.id, {
        title: req.body.title,
        content: req.body.content
    })
    res.redirect(`/posts/category/${req.params.category}`)
}

const destroy = async(req, res) => {
    await api.destroy(`posts/${req.params.category}`, req.params.id)
    res.redirect(`/posts/category/${req.params.category}`)
}

module.exports = {
    index, indexByCategory, create, store, edit, update, destroy
}
