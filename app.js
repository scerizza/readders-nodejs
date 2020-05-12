const express = require('express')
const app= express();
const mongoose = require('mongoose')
const  bodyParser= require('body-parser')

require('dotenv/config')

app.use(bodyParser.json())

//import Routes
const postRoute = require('./routes/posts')
app.use('/posts', postRoute)
const userRoute = require('./routes/users')
app.use('/user', userRoute)



//index
app.get('/', (req,res)=>{
    res.send('We are on home')
})

// connect to db

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true},
    ()=> console.log('connected to db'))


app.listen('3000');