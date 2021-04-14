import React, { useEffect,  useState} from 'react'
import Cart from './cart/Cart'
import Prods from './cart/Prods'
import Keys from './clients/Keys'

import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'


import { fetchProds } from '../DBconn';



function MainRec() {

    const [items, setItems] = useState([])
    
    useEffect(() =>{
        const getProds = async () => {
            const serverProds = await fetchProds()
            setItems({
                prods: serverProds.filter(el=>el.fixedPrice == true),
                cart: []
            })
        }
        getProds()
    }, [])

    const addItemtoCart = (id) => {
        const aux = items.prods.filter(el=> el.id==id ? el: null)
        // console.log(aux)
        // console.log(items.cart)
        if(items.cart=== undefined || items.cart.length == 0){
            // console.log("in if")
            setItems({
                prods: items.prods,
                cart:  aux
            })
        } else {
            if(!items.cart.includes(aux[0])){
                setItems({
                    prods: items.prods,
                    cart:  items.cart.concat(aux)
                })
            }            
        }
    }

    const removeItemFromCart = async (id) => {
        setItems({
            prods: items.prods,
            cart: items.cart.filter(el => el.id!==id)
        })
    }


    const removeAllCart = () => {
        setItems({
            prods: items.prods,
            cart: []
        })
    }


    
    const changeCartItemPrice =  ({id, price}) => {
        const auxCart = items.cart.map(el=>{
                            if(el.id == id){
                                return {...el, price:  price}
                            } else {
                                return el
                            }})
        setItems({
            prods: items.prods,
            cart: auxCart
        })

    }

    return (
        <div>
            <h1>Main Reception</h1>
            {/* {console.log(items)} */}
            {items ? <div>
                
                <GridRow wrap='wrap'>
                <GridColumn width={8}>
                    <Prods items ={items.prods} 
                        addItem = {addItemtoCart}/>
                </GridColumn>
                <GridColumn width={4}>
                    <Cart items ={items.cart} 
                        removeAllCart = {removeAllCart}
                        removeItem = {removeItemFromCart}
                        changeItem = {changeCartItemPrice}/>
                </GridColumn>
                </GridRow> </div>: null}

                <br/>
                <br/>
                <br/>
                <Keys/>
        </div>
    )
}

export default MainRec
