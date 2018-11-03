require('dotenv').config()

const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    const result = await axios.get('https://como-fazer-add43.firebaseio.com/api_echo.json')
    const content = !(result.data) ? 'Enjoy the Silence!' : result.data
    res.render('index', { api_echo: content})
})

app.get('/categories', async(req, res) => {
    const result = await axios.get('https://como-fazer-add43.firebaseio.com/categories.json')    
    const content = !(result.data) ? [] : result.data

    const categories = Object
                        .keys(content)
                        .map(key => {
                            return {
                                id: key,
                                ...content[key]
                            }
                        })

    res.render('categories/index', { categories: categories })
})

app.get('/categories/create', (req, res) => {
    res.render('categories/create')
})

app.post('/categories/store', async(req, res) => {
    await axios.post('https://como-fazer-add43.firebaseio.com/categories.json', {
        name: req.body.name
    })
    res.redirect('/categories')
})

app.get('/categories/edit/:id', async(req, res) => {
    const content = await axios.get(`https://como-fazer-add43.firebaseio.com/categories/${req.params.id}.json`)
    res.render('categories/edit', {
        category: {
            id: req.params.id,
            ...content.data
        }
    })
})

app.post('/categories/update/:id', async(req, res) => {
    await axios.put(`https://como-fazer-add43.firebaseio.com/categories/${req.params.id}.json`, {
        name: req.body.name
    })
    res.redirect('/categories')
})

app.get('/categories/destroy/:id', async(req, res) => {
    await axios.delete(`https://como-fazer-add43.firebaseio.com/categories/${req.params.id}.json`)
    res.redirect('/categories')
})

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if(err){
        console.log('Error: ', err)
    }else{
        console.log('Como_Fazer Server is Running on PORT:', port)
    }
})
