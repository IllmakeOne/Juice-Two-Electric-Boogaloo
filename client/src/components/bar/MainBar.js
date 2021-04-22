import React, { useEffect,  useState} from 'react'
import Cart from './cart/Cart'
import ProdSet from './products/ProdSet'
import AddSupplier from '../resources/restocking/AddSupplier'
import Button from 'react-bootstrap/Button'

import { GridRow, GridColumn } from 'emotion-flex-grid'


import { fetchProds } from '../DBconn'
import AddStock from '../resources/restocking/AddStock'


// import Box from '@material-ui/core/Box';


export const BarScreen = {
    SELLBAR : 'sell bar',
    ADDSTOCK : 'add stock',
    ADDSUPPLIER : 'add supplier',
    ADDITEM : 'add item'

}

   
//----------------------------------------Main Component--------------------------------------------------------------------------

function MainBar({startScreen}) {

    const[bar, setBar] = useState({
        prods: [],
        cart: []
    })

    const[screen, setScreen] = useState(startScreen)

    const Caller = () =>{
        switch(screen){
            case BarScreen.SELLBAR:
                // selling cart and item display
                    return <div> 
                            {bar ? <div>
                                <GridRow wrap='wrap' >
                                    <GridColumn width={9.5}>
                                         <ProdSet items = {bar.prods} onClick = {addtoCart} changeFav ={changeFav}/>
                                    </GridColumn>
                                    <GridColumn width={2.5} className='test'>
                                        <Cart  basket = {bar.cart} 
                                            removeItem = {removeItemfromCart}
                                            removeAllCart = {removeAllCart} 
                                            changeItem = {changeCartItem}
                                            addBulkItem={addBulkItem}/>
                                    </GridColumn>
                                </GridRow>
                                </div>:null}
                        </div>
            case BarScreen.ADDSUPPLIER:   
                //add a new supplier to DB
                    return <AddSupplier pushTop= {()=>{}}/>
            case BarScreen.ADDSTOCK:  
                //add new sellable item
                    return <AddStock pushTop={addItem}/>
                   
        }
    }

//----------------------------------------Methhods--------------------------------------------------------------------------

    // //get from db and pas son
    useEffect(() =>{
        const getProds = async () => {
            const serverProds = await fetchProds()
            setBar({
                prods: serverProds,
                cart: []
            })
        }
        getProds()
    
    // setTimeout(_exportPdf(),10000)
    }, [])


    
    const removeAllCart = () => {
        const auxProds = bar.prods
        const auxBasket = bar.cart
        auxBasket.map((el) => {
            auxProds.map((prd)=>{
                if(prd.id==el.id)
                    prd.stock+=el.stock
            })
        })

        setBar({prods: auxProds, cart: []})

    }

    const addItem = (item) => {
        // console.log(item)
    }

    const changeFav = (id) => {
        const aux = bar.prods.map((el)=>{
            if(el.id == id){
                return {...el, fav: !el.fav}
            } else {
                return el
            }
        })
        setBar({prods: aux, cart: bar.cart})   
    }


    const removeItemfromCart = async (id) => {

        const indexProd = bar.prods.findIndex(el  => el.id == id)
    
        const indexBask = bar.cart.findIndex(el  => el.id == id)
    
        bar.prods[indexProd].stock +=  bar.cart[indexBask].stock
        bar.cart.splice(indexBask,1)
        setBar({prods: bar.prods, cart: bar.cart})
    }

    const changeCartItem =  ({id, price, amount}) => {
        // console.log('id' +id +' price ' + price + ' amount ' + amount)
        var difference = 0
        bar.cart.forEach((el)=>{
            if(el.id == id){
                difference = amount - el.stock
                el.stock = amount
                el.price = price
            }
        })

        bar.prods.forEach((el)=>{
            if(el.id == id){
                el.stock -= difference
            }
        })

        setBar({prods: bar.prods, cart: bar.cart})
    }

    const addtoCart =  (inprod) => {
        // console.log(id)
        const auxProds = bar.prods
        const auxBasket = bar.cart

        const indexofprod = auxProds.findIndex(el => el.id==inprod.id)
        auxProds[indexofprod].stock-=1
        var aux = JSON.parse(JSON.stringify(auxProds[indexofprod]))

        const indexof = auxBasket.findIndex(el => el.name==inprod.name)
        if(indexof == -1){
            //if it doesnt, add it wiht stock 1
            console.log(aux)
            auxBasket.push({...aux, stock: 1})
        } else {
            //if it finds it , increase basket stock
            auxBasket[indexof].stock += 1
        }
        // console.log(bar.cart)
        setBar({prods: auxProds, cart: auxBasket})
    }

    const addBulkItem =  (cart) => {
        // console.log(cart)
        let auxProds = bar.prods
        let result = []
        cart.map(element => {
            var item = bar.prods.filter(el=>el.id===element.id)[0]
            var aux = item
            if(item.stock > 0){
                if(element.stock <= item.stock){
                    aux = {...aux, stock: element.stock}
                    auxProds.forEach(el=>{if(el.id == element.id) el.stock -= element.stock})
                } else {
                    aux = {...aux, stock: item.stock}
                    auxProds.forEach(el=>{if(el.id == element.id) el.stock = 0})
                }
                result.push(aux)    
            }
        })

        setBar({prods: auxProds, cart: result})
    }

    /*onSubmit = { } */
     /* onChange={e=>setname(e.target.value)<form>
                <input type="text" value = {ACTION.GET}/>
            </form>*/
    return (
        <div id='capture' className='mainbar' >
            <Button 
                    className ='switchToSellBar'
                    variant="outline-primary" 
                    onClick ={() => setScreen(BarScreen.SELLBAR)}
                    > 
                    Bar
            </Button>
            <Button 
                    className ='switchToAddsupplier'
                    variant="outline-primary" 
                    onClick ={() => setScreen(BarScreen.ADDSUPPLIER)}
                    > 
                    Add Supplier
            </Button>
            <Button 
                    className ='switchToAddInvItem'
                    variant="outline-primary" 
                    onClick ={() => setScreen(BarScreen.ADDITEM)}
                    > 
                    Add Inventory Item
            </Button>
            <Button 
                    className ='switchToAddStock'
                    variant="outline-primary" 
                    onClick ={() => setScreen(BarScreen.ADDSTOCK)}
                    > 
                    Add Inventory
            </Button>
            {Caller()}
        </div>   
    )
}

export default MainBar
