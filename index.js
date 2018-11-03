require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (request, response) => {
    response.send('Enjoy the silence!')
})

app.listen(port, (err) => {
    if(err){
        console.log('Error: ', err)
    }else{
        console.log('Como_Fazer Server is Running on PORT:', port)
    }
})