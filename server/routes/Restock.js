const db = require('../db');
const express = require("express");
const app = express();

app.get('/suppliers', async(req, res) => {
    const dbCall = await db.querry('select * from suppliers')
    res.status(200).send(JSON.parse(dbCall.rows))
    // console.log(dbCall)
})

app.post('suppliers', async(req, res) =>{
    var inKeys = JSON.parse(req.query.data)
    var rett =[]
    const postSuppliers =  async (nSupplier)=>{
        const dbCall = await db.querry(`INSERT INTO suppliers VALUES (${JSON.stringify(nSupplier)})`)
        return dbCall
    }
    inKeys.map(el => {
        rett.push(postSuppliers(el))
    })
    res.status(200).send(rett)
})

module.exports = app