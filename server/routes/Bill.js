const db = require('../db')
const express = require("express")
const app = express()
const fs = require('fs')



const generateRecepit = (items, cashAmunt,cardAmount)=>{
    var recipt = 'CF^RO 123456\n'
    items.forEach( item => {
        recipt +='S^' + item.name + '^'
            + item.price*100 + '^'
            + item.stock*1000 + '^'
            + '1^1\n'
    })
    if (cashAmunt != 0 )
        recipt += 'P^1^' + cashAmunt*100 + '\n'
    if (cardAmount != 0 )
        recipt += 'P^2^' + cardAmount*100 + '\n'
    recipt+='ST^\nTL^\nTL^' //subtotal + empty row + empty row
    return recipt
}

app.post('/bar', async(req, res) =>{
    console.log(req.body)
    const prods = req.body.items 
    const card = req.body.card
    const cash = req.body.cash
    const result = generateRecepit(prods, cash, card)
    // try{
    // dbCall = await db.querry(`UPDATE prods SET data = '${JSON.stringify(prod)}' WHERE id=${prod.id} RETURNING *`)
    // // console.log(dbCall)
    // }catch(error){
    //     console.log(error)
    // }

    // write to a new file named 2pac.txt
    fs.writeFile('C:/Fraps/HELP/bon.txt', result, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('bill saved');
    });
    res.status(200).send({data:result})
})


module.exports = app