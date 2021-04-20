require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


const keys = require('./routes/Keys');
app.use('/keys', keys)


const prods = require('./routes/Products');
app.use('/prods', prods)


const cart_lists = require('./routes/Cart_lists');
app.use('/cart_lists', cart_lists)


const bill = require('./routes/Bill');
app.use('/bill', bill)

const phones = require('./routes/PhoneNrs');
app.use('/phones', phones)

const apps = require('./routes/Appointments');
app.use('/apps', apps)



const port = 5000

app.use((req, res, next)=>{
    //log(req, res)
    // console.log(req)
    next()
})

app.listen(port, ()=>{
    console.log(`Server started on port : ${port}`)
})

