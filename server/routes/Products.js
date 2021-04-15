const db = require('../db')
const express = require("express")
const app = express()


const addClient =  async (prod)=>{
    // console.log(prod)
    const qury = `INSERT INTO prods (data) VALUES('${JSON.stringify(prod)}')`
    // console.log(qury)
    const dbCall = await db.querry(qury)
    // console.log(dbCall)
    return dbCall
}

app.get('/', async(req, res) => {
    const dbCall = await db.querry('SELECT * FROM prods')
    res.status(200).send(dbCall.rows)
    // console.log(dbCall)
    // res.send(html);
    // console.log(req.params) 
})


app.get('/:id', async(req, res) => {
  const dbCall = await db.querry(`SELECT * FROM prods WHERE id = ${req.params.id} `)
  res.status(200).send(dbCall.rows)
//   console.log(dbCall)
})


app.put('/:id', async(req, res) =>{
    var prod = req.body
    var dbCall
    try{
    dbCall = await db.querry(`UPDATE prods SET data = '${JSON.stringify(prod)}' WHERE id=${prod.id} RETURNING *`)
    // console.log(dbCall)
    }catch(error){
        console.log(error)
    }
    console.log(dbCall.rows)
    res.status(200).send(dbCall.rows)
})

// app.post('/:id', async(req, res) =>{
//     var inProd = req.body
//     // console.log(inProds)
//     const dbCall = await db.querry(`UPDATE prods SET fav=${inProd.fav} WHERE id=${req.params.id}`)
//     res.status(200).send(dbCall)
// })



app.post('/fill', async(req, res) =>{
    var inProds = req.body
    // console.log(inProds)
    if (typeof inProds == Array){
        var rett =[]
        inProds.map(async el => {
            try{rett.push(addClient(el))}catch(e){console.log(e)}
            })
            res.status(200).send(rett)
    } else {
        try{
        const aux = addClient(inProds)
        res.status(200).send(aux)}catch(e){console.log(e)}
    }
})

module.exports = app