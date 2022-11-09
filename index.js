const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()

// middleware
app.use(cors())
app.use(express.json())

//username: nuurkitchen
//password: VHQY2hrLXVodJlWa



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6x8xxck.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)





app.get('/', (req, res) => {
    res.send('assignment 11 server is open')
})

app.listen(port, () => console.log(`app is open on port ${port}`))