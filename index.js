const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express()

// middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6x8xxck.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const servicesCollection = client.db('nurKitchen').collection('services');
        const reviewsCollection = client.db('nurKitchen').collection('reviews');
        const subscribers = client.db('nurKitchen').collection('subscribers');

  
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });

        app.post('/services', async(req, res) => {
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            res.send(result)
        })

        app.get('/serviceDetails/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.send(service)
        })

        app.post('/reviews', async(req, res) => {
            const review = req.body;
            const result = reviewsCollection.insertOne(review);
            res.send(result)

        })

        app.get('/reviews/:id', async(req, res) => {
            let query = {}
            const id = req.params.id;
            if(id){
                query={
                    id: id,
                }
            }
            // const query = {id: ObjectId(id)};
            const cursor = reviewsCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })

        app.post('/subscribers', async(req, res) => {
            const service = req.body;
            const result = await subscribers.insertOne(service);
            res.send(result)
        })


    }
    finally {

    }

}
run().catch(error => console.log(error))


app.get('/', (req, res) => {
    res.send('assignment 11 server is open')
})

app.listen(port, () => console.log(`app is open on port ${port}`))