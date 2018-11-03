require('dotenv').config()
const port = process.env.PORT || 3000

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const api = require('./api')

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    const content = await api.echo()
    res.render('index', { api_echo: content})
})

app.get('/categories', async(req, res) => {
    const categories = await api.list('categories')
    res.render('categories/index', { categories: categories })
})

app.get('/categories/create', (req, res) => {
    res.render('categories/create')
})

app.post('/categories/store', async(req, res) => {
    await api.create('categories', {
        name: req.body.name
    })
    res.redirect('/categories')
})

app.get('/categories/edit/:id', async(req, res) => {
    const category = await api.get('categories', req.params.id)
    res.render('categories/edit', {
        category
    })
})

app.post('/categories/update/:id', async(req, res) => {
    await api.update('categories', req.params.id, {
        name: req.body.name
    })
    res.redirect('/categories')
})

app.get('/categories/destroy/:id', async(req, res) => {
    await api.destroy('categories', req.params.id)
    res.redirect('/categories')
})

app.listen(port, (err) => {
    if(err){
        console.log('Error: ', err)
    }else{
        console.log('Como_Fazer Server is Running on PORT:', port)
    }
})
