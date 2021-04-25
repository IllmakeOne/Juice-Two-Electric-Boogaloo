const db = require('../db')
const express = require("express")
const app = express()


const getNumberOfWeek = (firnatedDate) => {
    const aux = firnatedDate.split('-')
    const today = new Date(parseInt(aux[2]),(parseInt(aux[1])-1),parseInt(aux[0]))
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

const addApp = async (app) =>{
    const qury = `INSERT INTO apps (data) VALUES ('${JSON.stringify(app)}') RETURNING *`
    const dbCall = await db.querry(qury)
    return dbCall.rows[0]
}
const addWeeklyApp = async (app) =>{
    const qury = `INSERT INTO appsly (data) VALUES ('${JSON.stringify(app)}') RETURNING *`
    const dbCall = await db.querry(qury)
    return dbCall.rows[0]
}


app.get('/weekly/:field', async(req, res) => {
    var qurey
    if(req.params.field == 'Tennis'){
        qurey = `SELECT * FROM appsly WHERE data->>'field'='T1' OR data->>'field'='T2' OR data->>'field'='T3' `
    } else if (req.params.field == 'Aerobic'){
        qurey = `SELECT * FROM appsly WHERE data->>'field'='A1' OR data->>'field'='A2' OR data->>'field'='A3' `
    } else {
        qurey = `SELECT * FROM appsly WHERE data->>'field'='${req.params.field}'`
    }
    const dbCall = await db.querry(qurey)
    res.status(200).send(dbCall.rows)
})

app.get('/:field', async(req, res) => {
    const qurey = `SELECT * FROM apps WHERE data->>'field'='${req.params.field}'`
    const dbCall = await db.querry(qurey)
    res.status(200).send(dbCall.rows)
})

app.post('/add', async(req, res) => {
    var inapp = req.body
    // console.log(inapp)
    var result
    if(inapp.weekly == true){
        result = await addWeeklyApp(inapp)
    } else {
        result = await addApp(inapp)  
    }  
    // console.log(result)
    res.status(200).send(result)
})


app.post('/weekly', async(req, res) => {
    var inapp = req.body
    const aux = addWeeklyApp(inapp)
    res.status(200).send(aux)
})

app.delete('/:id', async(req, res) => {
    const qurey = `DELETE  FROM apps WHERE id = '${req.params.id}'`
    const dbCall = await db.querry(qurey)
    res.status(200).send(dbCall.rows)
})

app.delete('/weekly/:id', async(req, res) => {
    const qurey = `DELETE  FROM appsly WHERE id = '${req.params.id}'`
    const dbCall = await db.querry(qurey)
    res.status(200).send(dbCall.rows)
})  

// app.get('/:id', async(req, res) => {
//   const dbCall = await db.querry(`SELECT * FROM apps WHERE id = ${req.params.id} `)
//   res.status(200).send(dbCall.rows)
// })


// app.put('/:id', async(req, res) =>{
//     var prod = req.body
//     var dbCall
//     try{
//         dbCall = await db.querry(`UPDATE apps SET data = '${JSON.stringify(prod)}' WHERE id=${prod.id} RETURNING *`)
//      }catch(error){
//         console.log(error)
//     }
//     // console.log(dbCall.rows)
//     res.status(200).send(dbCall.rows)
// })

// app.post('/', async(req, res) =>{
//     var inapp = req.body
//     const aux = addApp(inapp)
//     res.status(200).send(aux)
// })


/*
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
*/

module.exports = app