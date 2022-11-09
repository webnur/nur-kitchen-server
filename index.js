const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6x8xxck.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {

 const servicesCollection = client.db('nurKitchen').collection('services');

 app.get('/services', async(req, res) => {
    const query = {};
    const cursor = servicesCollection.find(query);
    const services = await cursor.toArray();
    res.send(services)
 })

}
run().catch(error => console.log(error))


app.get('/', (req, res) => {
    res.send('assignment 11 server is open')
})

app.listen(port, () => console.log(`app is open on port ${port}`))