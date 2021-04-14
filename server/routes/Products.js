const db = require('../db')
const express = require("express")
const app = express()


const putClient =  async (prod)=>{
    const qury = `INSERT INTO products (name,price, stock, type, vat, fixpr, image, fav)  VALUES ('${prod.name}',${prod.price},${prod.stock}, '${prod.type}', ${prod.vat},${prod.fixedPrice},'${prod.image}',${prod.fav})`
    const dbCall = await db.querry(qury)
    return dbCall
}

app.get('/', async(req, res) => {
    const dbCall = await db.querry('SELECT * FROM products')
    res.status(200).send(dbCall.rows)
    // console.log(dbCall)
    // res.send(html);
    // console.log(req.params) 
})


app.get('/:id', async(req, res) => {
  const dbCall = await db.querry(`SELECT * FROM products WHERE id = ${req.params.id} `)
  res.status(200).send(dbCall.rows)
  console.log(dbCall)
})

app.post('/one', async(req, res) => {  
    const prod = req.body
    console.log(prod)
    var dbCall
    try {
        dbCall = await db.querry(`INSERT INTO products VALUES ('${prod.name}',${prod.price},${prod.stock}, '${prod.type}', ${prod.vat},${prod.fixedPrice},'${prod.image}',${prod.fav})`)
    } catch (error) {
        console.log(error)
    }
    // res.status(200).send(dbCall.rows)
    console.log(dbCall)
  })

app.post('/fill', async(req, res) =>{
    var inProds = req.body
    // console.log(inProds)
    var rett =[]
    inProds.map(el => {
        rett.push(putClient(el))
    })
    res.status(200).send(rett)
})


app.put('/:id', async(req, res) =>{
    var inProd = req.body
    // console.log(inProds)
    const dbCall = await db.querry(`UPDATE products SET fav=${inProd.fav} WHERE id=${req.params.id}`)
    res.status(200).send(dbCall)
})

module.exports = app