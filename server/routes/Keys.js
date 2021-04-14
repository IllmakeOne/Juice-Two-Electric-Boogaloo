const db = require('../db');
const express = require("express");
const app = express();

app.get('/', async(req, res) => {
    const dbCall = await db.querry('select * from keys')
    res.status(200).send(dbCall.rows)
    console.log(dbCall)
    // res.send(html);
    // console.log(req.params) 
})


app.get('/:id', async(req, res) => {
  const dbCall = await db.querry(`SELECT * FROM keys WHERE id = ${req.params.id} `)
  res.status(200).send(dbCall.rows)
  console.log(dbCall)
})

app.post('/fill', async(req, res) =>{
    var inKeys = JSON.parse(req.query.data)
    var rett =[]
    const putKey =  async (key)=>{
        const dbCall = await db.querry(`INSERT INTO keys VALUES (${key.id},${key.assigned})`)
        return dbCall
    }
    inKeys.map(el => {
        rett.push(putKey(el))
    })
    res.status(200).send(rett)
})

module.exports = app