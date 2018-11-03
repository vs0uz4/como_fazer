require('dotenv').config()

const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/', async(request, response) => {
    const content = await axios.get('https://como-fazer-add43.firebaseio.com/api_echo.json') || 'Enjoy the Silence!'
    response.render('index', { api_echo: content.data})
})

app.listen(port, (err) => {
    if(err){
        console.log('Error: ', err)
    }else{
        console.log('Como_Fazer Server is Running on PORT:', port)
    }
})
