import Button from '@material-ui/core/Button'
import { GridRow, GridColumn} from 'emotion-flex-grid'
import {useState, useContext} from 'react'

import { GiCash } from "react-icons/gi";
import { FiTrash2, FiSave, FiBookOpen} from "react-icons/fi"
import { IoIosCash } from "react-icons/io"
import { GoCreditCard } from "react-icons/go"

import OrangePaper from '../../containers/papers/OrangePaper'
import PaymentDialogue from './PaymentDialogue';
import { MyContext } from '../../App';
function PaymentBox() {


    const cx = useContext(MyContext)
    const decLg = (en, ro) => {
      if(cx.lg=='en')
          return en
      else
          return ro
    }
    
    const [open, setOpen] = useState(true)
    const [variant, setVariant] = useState('')

    const items = [
        {
            name:'fanta',
            price: 6,
            stock: 1
        },
        {
            name:'cola',
            price: 6,
            stock: 10
        },
        {
            name:'apa',
            price: 5,
            stock: 5
        },
    ]   
    const getSumToal = () =>{
        var res = 0
        items.map(el => {
            res+=el.price
        })
        return res
    }

    const payCash = () =>{

    }

    const payCard = () =>{

    }

    const payMix = (cardam, casham) =>{

    }

    var recipt = 'CF^RO 123456\n'


    /**
     * 
     * @param {*} items ={ name, price, stock}
     */
    const AddItemstoBill = (items) =>{
        // S^ARTICOL 1^600^1000^buc^1^1
        var ret = ''
        items.forEach( item => {
            ret +='S^' + item.name.toUpperCase() + '^'
                + item.price*100 + '^'
                + item.stock*1000 + '^'
                + '1^1\n'
        });
        recipt += ret
        // console.log(recipt)
    }

    /**
     * cash is the cash amount paid
     * card is the card amount paid
     */
    const AddPaymenttoBill = ({cash, card}) =>{
        var ret = ''
        if (cash != 0 )
            ret += 'P^1^' + cash*100 + '\n'
        if (card != 0 )
            ret += 'P^2^' + card*100 + '\n'

        recipt+=ret
        // console.log(recipt)
    }

    const makeDummyRecipt = () =>{
        AddItemstoBill(items)
        AddPaymenttoBill({cash:19, card:10})
        recipt+='ST^\nTL^\nTL^' //subtotal + empty row + empty row
        console.log(recipt)
    }

    const closeDialogue = () =>{
        setOpen(false)
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <div className='payment_box'>
                {getSumToal()}

                <GridRow>
                    <GridColumn width ={4}>
                        <Button className = 'cart_svlist'
                                variant="outlined" 
                                color="primary"
                                size="large"
                                startIcon={<IoIosCash />}
                                onClick={payCash}
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
                            onClick={payCard}
                            >
                            Card
                        </Button>
                    </GridColumn>
                    
                    <GridColumn width={4}>
                        <Button className = 'cart_svlist'
                            variant="outlined" 
                            color="primary"
                            size="large"
                            startIcon={<GiCash />}
                            onClick={payMix}
                            >
                            C and C
                        </Button>
                    </GridColumn>
                </GridRow>


                <PaymentDialogue 
                    open = {open}
                    variant ={variant}
                    closeD = {closeDialogue}
                />  	

            </div>
        </div>
    )
}

export default PaymentBox
