const express = require('express');
const env = require('dotenv');
const conMongodb = require('./db')
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const app = express();

env.config();
conMongodb();

// app.use((req, res, next) => {
//    console.log(req.originalUrl);
//    next()
// })

app.get('/',(req,res) => {
    res.send('hello')
});
//Routes
app.use('/api/products', require('./Routes/ProductsRoute'));

// Error Handling Middleware 
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,() => {
  console.log('running on Port 5000')
})