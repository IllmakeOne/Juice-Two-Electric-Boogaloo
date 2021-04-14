import { FiCheck, FiTrash } from "react-icons/fi"
import ChangePriceB from './ChangePriceB'

import NumPad from 'react-numpad';

import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { Button } from '@material-ui/core'
  

const RecCartButton= ({item, removeItem, changeItem}) =>{

    
    // const [open, setOpen] = useState(false)

    const [price, setPrice] = useState(0)

    const updatePrice = (value) => {
        changeItem({id: item.id, price: value})
        setPrice(value)
    }

    return (
        <div className = 'cartbutton' >

                Name: <h3>{item.name}</h3> <br/>
                Number Selected: <h3>{item.stock}</h3> <br/>
                Price of Item: <h3>{item.price}</h3><br/>

                <Button 
                    className='cart_button'
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<FiTrash />}
                    onClick ={()=>removeItem(item.id)}
                    >
                </Button>
            
            <NumPad.Number
                onChange={(value) => {updatePrice(value)}}
                label={'Price'}
                placeholder={'my placeholder'}
                value={price}
                decimal={2}
            />

            </div>
    )
}

export default RecCartButton

