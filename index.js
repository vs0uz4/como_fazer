require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const categoriesRoutes = require('./routes/categories')
const api = require('./api')

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    const content = await api.echo()
    res.render('index', { api_echo: content})
})

app.use('/categories', categoriesRoutes)

const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if(err){
        console.log('Error: ', err)
    }else{
        console.log('Como_Fazer Server is Running on PORT:', port)
    }
})
