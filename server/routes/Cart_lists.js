const db = require('../db')
const express = require("express")
const app = express()


const addCartList =  async (list)=>{
    // console.log(prod)
    const qury = `INSERT INTO cart_lists (data) VALUES('${JSON.stringify(list)}')`
    const dbCall = await db.querry(qury)
    return dbCall
}

app.get('/', async(req, res) => {
    const dbCall = await db.querry('SELECT * FROM cart_lists')
    res.status(200).send(dbCall.rows)
    // console.log(dbCall)
    // res.send(html);
    // console.log(req.params) 
})

app.post('/', async(req, res) => {
    try{
        const aux = addCartList(req.body)
        res.status(200).send(aux)
    } catch(e)  {console.log(e)}
})

app.delete('/:id', async(req, res) => {
  const dbCall = await db.querry(`DELETE FROM cart_lists WHERE id = ${req.params.id} `)
  res.status(200).send(dbCall.rows)
  console.log(dbCall)
})


module.exports = app