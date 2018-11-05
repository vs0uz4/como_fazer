require('dotenv').config()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const api = require('./api')
const categoriesRoutes = require('./routes/categories')
const postsRoutes = require('./routes/posts')

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('assets'))
app.use('/categories', categoriesRoutes)
app.use('/posts', postsRoutes)

app.get('/', async(req, res) => {
    const content = await api.echo()
    res.render('index', { api_echo: content})
})

app.listen(port, (err) => {
    if(err){
        console.log('Error: ', err)
    }else{
        console.log('Como_Fazer Server is Running on PORT:', port)
    }
})
