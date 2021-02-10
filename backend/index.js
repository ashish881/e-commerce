const express = require('express');
const env = require('dotenv');
const conMongodb = require('./db')
const app = express();
const products = require('./data/products');

env.config();
conMongodb();

app.get('/',(req,res) => {
    res.send('hello')
});

app.get('/products',(req,res) => {
  res.send({products})
});

app.get('/products/:id',(req,res) => {
  const id = req.params.id;
  const data = products.find(p => p.id === id);
  res.send(data);
})

app.listen(process.env.PORT,() => {
  console.log('running on Port 5000')
})