const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

const users = ["Jeson", "Anny", "Rifat", "Sajjad", "Kalim", "Hena"]



app.get('/products', (req, res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray( (err, documents)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(documents);
            }  
        });
        console.log("database connected");
        client.close();
      });
});

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})
//post
app.post('/addProduct', (req, res)=>{
    //save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result.ops[0]);
            }
            
        });
        console.log("database connected");
        client.close();
      });    
});

const port = process.env.PORT || 4200;

app.listen(port, ()=> console.log("Listening to port 4200"));