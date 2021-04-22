import Button from '@material-ui/core/Button'
import { GridRow, GridColumn} from 'emotion-flex-grid'
import {useState, useContext} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import { GiCash } from "react-icons/gi";
import { FiTrash2, FiSave, FiBookOpen} from "react-icons/fi"
import { IoIosCash } from "react-icons/io"
import { GoCreditCard } from "react-icons/go"

import OrangePaper from '../../containers/papers/OrangePaper'
import PaymentDialogue from './PaymentDialogue';
import { MyContext } from '../../App';
import { Paper } from '@material-ui/core';

function PaymentBox({items}) {
    const C = useStyles()
    const cx = useContext(MyContext)
    const decLg = (en, ro) => {
      if(cx.lg=='en')
          return en
      else
          return ro
    }
    
    const [open, setOpen] = useState({on: false, cc: 'cash'})


    // const items= [{name: 'juice', price: 6, stock: 3},{name: 'coffe', price: 6, stock: 1},{name: 'coffe', price: 6, stock: 1},{name: 'coffe', price: 6, stock: 1}]
 
    const getSumToal = () =>{
        var res = 0
        items.map(el => {
            res+=el.price*el.stock
        })
        return res
    }

 
    
    const payCash = () =>{
        setOpen({cc: 'cash', on: true})

    }

    const payCard = () =>{
        setOpen({cc: 'card', on: true})
    }

    const payMix = () =>{
        setOpen({cc: 'mix', on: true})
    }

    const closeDialogue = () =>{
        setOpen({cc: '', on: false})
    }

    return (
        <Paper className={C.box} >
            <div className='sumtotal'>Total: {getSumToal()}</div>

            <GridRow>
                <GridColumn width ={12}>
                    <Button className = 'cart_svlist'
                            variant="outlined" 
                            color="primary"
                            size="large"
                            startIcon={<IoIosCash />}
                            onClick={payCash}
                            >
                            {decLg('Pay','Plateste')}
                    </Button>
                </GridColumn>
            </GridRow>

            <PaymentDialogue 
                open = {open}
                closeD = {closeDialogue}
                items={items}
            />  	

        </Paper>
    )
}

const useStyles = makeStyles({
    box: {
        margin: 5,
        padding: 6,
        textAlign: 'center',
        width: '100%',
        height : 100,
        // border: 'solid'
    },
  });
export default PaymentBox
