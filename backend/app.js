const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path=require('path')
const cors=require('cors');
const connectDatabase=require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', "config.env")})

const products = require('./routes/products');
const order= require('./routes/order');

connectDatabase();


app.use(express.json())
app.use(cors());
app.use('/api/v1',products);
app.use('/api/v1',order);

app.listen(process.env.PORT, ()=>{
    console.log(`server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});

app.get('/', (req, res) => {
    res.send("Backend is running successfully!");
});


