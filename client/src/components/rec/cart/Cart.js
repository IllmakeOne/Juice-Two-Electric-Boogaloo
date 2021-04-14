import React, { useEffect,  useState} from 'react'
import { Button, Paper } from '@material-ui/core';
import { FiTrash2, FiShoppingCart} from "react-icons/fi"

import { css, cx } from '@emotion/css'

import RecCartButton from './RecCartButton'


export default function Cart(
    {items, removeItem ,removeAllCart, changeItem}) {

    const getSum = () => {
        var sum = 0
        var bruh =items? items.forEach(element => {
            sum += element.price           
        }) : null
        
        return sum
    }
    
    const gasPrice = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'RON',
                          minimumFractionDigits: 1 });


    return (
        <React.Fragment>
        <div className='cart'>
            <h2>Cart</h2>
            <Button className = 'deleteAllcart'
                    variant="outline-primary" 
                    onClick ={()=>removeAllCart()}
                    >
                    Empty cart
                       <FiTrash2 />
                </Button>
                
            <Paper style={{maxHeight: 550, overflow: 'auto'}} >
                <div className ={css`
                        padding: 32px;
                        background-color: hotpink;
                        font-size: 24px;
                        border-radius: 4px;
                        overflow: scroll;
                        white-space: nowrap;
                        `}>
                    {/* {console.log("in cart")}
                    {console.log(items)} */}
                {items ? items.map((item) => 
                    (
                    <div key = {item.id} 
                        >
                        <RecCartButton item = {item} 
                            removeItem = {removeItem}
                            changeItem = {changeItem}/>
                    </div>            
                    )):null 
                }
                </div>
             </Paper>


            <div className='finalbasket'>
                Finish total: {gasPrice.format(getSum())} lei
            </div>
            <Button 
                className='finalbasket'
                variant="contained"
                size="large"
                startIcon={<FiShoppingCart />}
                // onClick ={()=>removeItem(item.id)}
                >
            </Button>
        </div>
        </React.Fragment>
    )
}
