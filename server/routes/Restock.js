const db = require('../db');
const express = require("express");
const app = express();


const addSupplier = async (supp) =>{
    const qury = `INSERT INTO suppliers (data) VALUES ('${JSON.stringify(supp)}')`
    const dbCall = await db.querry(qury)
    return dbCall
}

app.get('/supps', async(req, res) => {
    const qurey = `SELECT * FROM suppliers `
    const dbCall = await db.querry(qurey)
    res.status(200).send(dbCall.rows)
})

app.post('/supps', async(req, res) => {
    var inSup = req.body
    var result = addSupplier(inSup) 
    res.status(200).send(result)
})

app.put('/supps/:id', async(req, res) =>{
    var supplr = req.body
    var dbCall
    try{
    dbCall = await db.querry(`UPDATE suppliers SET data = '${JSON.stringify(supplr)}' WHERE id=${supplr.id} RETURNING *`)
    // console.log(dbCall)
    }catch(error){
        console.log(error)
    }
    // console.log(dbCall.rows)
    res.status(200).send(dbCall.rows)
})

app.delete('/supps/:id', async(req, res) => {
    const qury = `DELETE FROM suppliers WHERE id=${req.params.id}`
    const dbCall = await db.querry(qury)
    res.status(200).send(dbCall)
})



module.exports = app