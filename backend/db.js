const mongoose = require('mongoose');

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
          });
          console.log('mongodb connected');
    } catch (error) {
        console.log(error);
    }
 
}

module.exports = conn;