import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
// require('dotenv').config()

const port = 5000

const app = express()

app.use(morgan('dev'))

app.use(express.json())
// app.use(bodyParser())

app.use((req, res, next)=>{
    //log(req, res)
    // console.log(req)
    next()
})

app.listen(port, ()=>{
    console.log(`Server started on port : ${port}`)
})
const prods = [{name: 'fanta'},{name: 'coke'}]

app.get('/prods',(req, res) => {
    // console.log(prods)
    // res.header("Content-Type", "text/html")
    // res.status(200).json({
    //     status: "success",
    //     data: prods,
    // })

    res.status(200).send(prods)
    console.log(res.body)
    // res.send(html);
    // console.log(req.params) 
})

app.get('/prods/:id',(req, res) => {
    const aux = prods[parseInt(req.params.id)-1]
    // console.log(parseInt(req.params.id) +'asdasd')
    res.status(200).send({bro: aux})
    console.log(res.data)
    // res.send(html);
    // console.log(req.params) 
})