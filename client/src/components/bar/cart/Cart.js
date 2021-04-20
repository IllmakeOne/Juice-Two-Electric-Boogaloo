
import { Button, Paper } from '@material-ui/core'
import CartButton from './CartButton'

import { GiCash } from "react-icons/gi";
import { FiTrash2, FiSave, FiBookOpen} from "react-icons/fi"
import { IoIosCash } from "react-icons/io"
import { GoCreditCard } from "react-icons/go"
import { css, cx } from '@emotion/css'

import { useState, useEffect, useContext } from 'react'

import MyDialogue from '../pieces/MyDialogue'
import { addCartList, deleteCartList,fetchCartProdLists, addBill } from '../../DBconn'
import ChangePriceB from './ChangePriceB'


import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'

import RecCartButton from './RecCartButton'
import { MyContext } from '../../../App';
import { formatDate } from '../../rec/schedules/pieces/DatesMethods';

function Cart({basket, removeItem ,removeAllCart, changeItem, addBulkItem}) {

    const cx = useContext(MyContext)
    const decLg = (en, ro) => {
      if(cx.lg=='en')
          return en
      else
          return ro
    }
    const [open, setOpen] = useState(false)
    const [dialogueVariant, setDialogVariant] = useState('load')
    const [prodLists, setProdLists] = useState([])

    

    useEffect(() => {
        const anon = async ()=>{
            const serverLists = await fetchCartProdLists()
            setProdLists(serverLists)
            // console.log(serverLists)
        }
        anon()
    }, [])


    const getSum = () => {
        var sum = 0
        basket.forEach(element => {
            sum += element.price * element.stock            
        })
        return sum
    }

    const saveList = () => {
        if(basket.length == 0){
            alert(decLg('Cart Empty!','Cos Gol!'))
            return 
        }
        setDialogVariant('save')
        setOpen(true)
    }


    const handleLoadLicstClick = () => {
        setDialogVariant('load')
        setOpen(true)
    };

    const handleSubmit = (value) => {
        setOpen(false)
        if(dialogueVariant == 'save' ){
            var aux = []
            basket.forEach(element => {
                aux.push({id: element.id, stock: element.stock})    
            })
            const dab = prodLists
            dab.push({name: value,prods: aux, date: formatDate(new Date) })
            setProdLists(dab)
            addCartList({name: value,prods: aux, date: formatDate(new Date) })
            removeAllCart()
        } else if(dialogueVariant == 'load'){
            removeAllCart()
            setProdLists(prodLists.filter(el=>el.id!=value.id))
            deleteCartList(value.id)
            addBulkItem(value.prods)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const payCash =()=>{
        const sum = getSum()
        // console.log('paycash clicked')
        addBill(basket, sum , 0)
    }

    
    return (
        <div >

        <MyDialogue 
            prodLists={prodLists}
            open={open} 
            onSubmit={handleSubmit} 
            onClose={handleClose}
            variant= {dialogueVariant} 
        />

            
        <div className='cart'>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
            </Button> */}
            

        <GridRow className='test' align='center ' justify="end ">
            <GridColumn width ={4}>
                <Button className = 'cart_svlist'
                    variant="outlined" 
                    color="primary"
                    size="large"
                    startIcon={<FiSave />}
                    onClick ={()=>saveList()}
                    >
                    {decLg('Save List', 'Salveaza Lista')}
                </Button>
            </GridColumn>
            <GridColumn width ={4}>
                <Button className = 'cart_svlist'
                    variant="outlined" 
                    color="primary"
                    size="large"
                    startIcon={<FiBookOpen />}
                    onClick ={handleLoadLicstClick}
                    >
                    {decLg('Load List', 'Incarca Lista')}
                </Button>
            </GridColumn>
            <GridColumn width={4}>
             <Button className = 'cart_svlist'
                variant="outlined" 
                color="primary"
                size="large"
                startIcon={<FiTrash2 />}
                onClick ={()=>removeAllCart()}
                >
                {decLg('Empty cart', 'Goleste Cos')}
             </Button>
            </GridColumn>
        </GridRow>
             <h2>Cart Items</h2>
            <Paper style={{maxHeight: 550, overflow: 'auto'}} >
            <div className ={css`
                    padding: 12px;
                    background-color: white;
                    font-size: 24px;
                    height: 100%;
                    border-radius: 4px;
                    white-space: nowrap;
                    `}>
               {basket.map((item) => 
                ( 
                <div key = {item.id} className ='cartbutton' 
                    >
                    <CartButton item = {item} 
                        removeItem = {removeItem}
                        changeItem = {changeItem}/>
                </div>            
                )) 
            }
             </div>
        </Paper>
        
        <div className='finalbasket'>
            <h2>Finish total: {getSum()} lei</h2>
        </div>
            {/* <Button 
                className='finalbasket'
                variant="contained"
                color='green'
                size="large"
                startIcon={<FiShoppingCart />}
                // onClick ={()=>removeItem(item.id)}
                >
            </Button> */}
        <GridRow>
            <GridColumn width ={4}>
                <Button className = 'cart_svlist'
                        variant="outlined" 
                        color="primary"
                        size="large"
                        startIcon={<IoIosCash />}
                        onClick ={payCash}
                        >
                        Cash
                </Button>
            </GridColumn>
            <GridColumn width={4}>
                <Button className = 'cart_svlist'
                    variant="outlined" 
                    color="primary"
                    size="large"
                    startIcon={<GoCreditCard />}
                    // onClick ={()=>removeAllCart()}
                    >
                    Carad
                </Button>
            </GridColumn>
            
            <GridColumn width={4}>
                <Button className = 'cart_svlist'
                    variant="outlined" 
                    color="primary"
                    size="large"
                    startIcon={<GiCash />}
                    // onClick ={()=>removeAllCart()}
                    >
                    CandC
                </Button>
            </GridColumn>
        </GridRow>

        </div>  
        </div> 
    )
}

export default Cart
