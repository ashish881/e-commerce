const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/user');
const product = require('./data/products');
const User = require('./Model/UserModel');
const Product = require('./Model/ProductsModel');
const conMongodb = require('./db');

dotenv.config();
conMongodb();

const importData = async () => {
    try {
        // deleting the all data in model database
        await User.deleteMany();
        await Product.deleteMany();
        // importing the user data into User Model
        const createdUsers = await User.insertMany(users);
        // finding the admin user in model
        const adminUser = createdUsers[0]._id
        // In product model adding the admin user 
        const sampleProducts = product.map(product => {
            return { ...product, user: adminUser }
        });
        // importing the Product data into the product model 
        await Product.insertMany(sampleProducts);
        console.log('data imported');
    } catch (error) {
        console.log(error)
    }
}

const dataDestroy = async () => {
    try {
        // deleting the all data in model database
        await User.deleteMany();
        await Product.deleteMany();

        console.log('data deleted');
    } catch (error) {
        console.log(error)
    }
}

if (process.argv[2] === '-d') {
    dataDestroy();
} else {
    importData();
}