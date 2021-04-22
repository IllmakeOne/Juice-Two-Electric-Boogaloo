const db = require('../db')
const express = require("express")
const app = express()

const testFolder = './billtest/'
const fs = require('fs')

// fs.unlink('file.txt', (err) => {
//     if (err) {
//         throw err;
//     }

//     console.log("File is deleted.");
// });


const readFoder = ()=>{
    fs.readdirSync(testFolder).forEach(file => {
        console.log(file)
        readFile(file)
        deleteFile(file)
      })
}

setInterval(readFoder, 50);

const deleteFile = (file) =>{
    const aux = testFolder + file
    // console.log(aux)
    fs.unlinkSync(aux)
}

const readFile = (file) =>{
    const aux = testFolder + file
    fs.readFile(aux, 'utf8', (err, data)=>{
        if(err){
            return console.log(err)
        }
        console.log(data)
    })

}


app.post('/bar', async(req, res) =>{
    console.log(req.body)
    // const prods = req.body.items 
    // const card = req.body.card
    // const cash = req.body.cash
    const result = req.body.bill
    // try{
    // dbCall = await db.querry(`UPDATE prods SET data = '${JSON.stringify(prod)}' WHERE id=${prod.id} RETURNING *`)
    // // console.log(dbCall)
    // }catch(error){
    //     console.log(error)
    // }

    // write to a new file named 2pac.txt
    const aux = testFolder + 'bon.txt'
    fs.writeFile(aux, result, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        console.log('bill saved');
    });
    res.status(200).send({data: 'posted'})
})


module.exports = app