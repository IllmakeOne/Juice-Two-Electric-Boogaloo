const db = require('../db')
const express = require("express")
const app = express()


const addPhone =  async (prod)=>{
    const qury = `INSERT INTO phones (data) VALUES('${JSON.stringify(prod)}')`
    const dbCall = await db.querry(qury)
    return dbCall
}

app.get('/', async(req, res) => {
    const dbCall = await db.querry('SELECT * FROM phones')
    res.status(200).send(dbCall.rows)
})



app.put('/:id', async(req, res) =>{
    var prod = req.body
    var dbCall
    try{
    dbCall = await db.querry(`UPDATE phones SET data = '${JSON.stringify(prod)}' WHERE id=${prod.id} RETURNING *`)
    // console.log(dbCall)
    }catch(error){
        console.log(error)
    }
    console.log(dbCall.rows)
    res.status(200).send(dbCall.rows)
})

app.post('/fill', async(req, res) =>{
    var inProds = req.body
    console.log(inProds[0])
    var rett =[]
    inProds.map(async el => {
        try{rett.push(addPhone(el))}catch(e){console.log(e)}
        })
        res.status(200).send(rett)
})

module.exports = app