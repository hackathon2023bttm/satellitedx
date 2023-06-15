const {MongoClient} = require('mongodb');
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
const port = 4000;

//Connects to the database using my key
const uri = "mongodb+srv://dev0:nfDs8pxI1cUsSQbq@cluster0.ejyfycm.mongodb.net/dev0?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json());

app.post('/get_db', async (req, res) => {

    try {
        await client.connect();
        
        const databaseName = "dev0";
        const collectionName = "satellite";
    
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        
        //querying where the data is satellite 1 for now
        const satellite_name = req.body.satellite;
        console.log(satellite_name);
        const query = { name: satellite_name};
        const documents = await collection.find(query).toArray();
        
        console.log(documents)
        res.json(documents);
    
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred' });
      } finally {
        await client.close();
      }
});

app.listen(port, () => {
    console.log('Server is running on port ', port);
});