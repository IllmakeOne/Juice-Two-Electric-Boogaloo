import { FiCheck, FiCheckSquare, FiTrash } from "react-icons/fi"

import NumPad from 'react-numpad';

import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { Button,FormControl,FormHelperText, Input,InputLabel} from '@material-ui/core'
  

const RecCartButton= ({item, removeItem, changeItem}) =>{

    
    // const [open, setOpen] = useState(false)

    const [price, setPrice] = useState(0)
    const [newprice, setNewPrice] = useState(0)

    const handleSubmitPrice = () => {
        changeItem({id: item.id, price: newprice})
        setPrice(newprice)
        // console.log(newprice)
        // console.log(item.id)
        // console.log()
    }


    const handleChange = evt => {
        setNewPrice(evt.target.value)
    }

    return (
        <div className = 'cartbutton' >

                Name: <h3>{item.name}</h3> <br/>
                Price of Item: <h3>{item.price}</h3><br/>
            
            {/* <NumPad.Number
                // onChange={(value) => updatePrice(value)}
                onSubmit={(value) => setNewPrice(value)}
                label={'Price'}
                placeholder={newprice }
                value={newprice}
                decimal={2}
            /> */}

            {/* <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl> */}

        {/* <form  noValidate autoComplete="off" onSubmit={updatePrice()}>*/}
            <TextField
                id="filled-number"
                label="Number"
                type="number"
                size='small'
                defaultValue={item.price}
                InputLabelProps={{
                shrink: true,
                }}
                variant="filled"
                onChange={handleChange}
            />
        {/*</form> */}
            <Button 
                className='b.changeprice'
                // variant="contained"
                color="primary"
                size="small"
                startIcon={<FiCheckSquare />}
                onClick ={()=>handleSubmitPrice()}
                >
            </Button><br/>

            
            <Button 
                    className='cart_button'
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<FiTrash />}
                    onClick ={()=>removeItem(item.id)}
                    >
                </Button>

            </div>
    )
}

export default RecCartButton

