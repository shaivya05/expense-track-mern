const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./models/db');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter=require('./routes/ProductRouter');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/welcome',(req,res)=>{
   res.send('ho gayaa chaluuu')
})
app.use('/auth', AuthRouter);
app.use('/products',ProductRouter);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})