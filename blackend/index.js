const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routers/routes')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/node_blackend_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, ()=> {
    console.log('connected to the database')
})


app.use('/api/',routers);


app.listen(8000, ()=> console.log('start server'))