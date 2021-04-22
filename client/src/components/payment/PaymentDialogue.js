import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import { GridRow, GridColumn} from 'emotion-flex-grid'
import {useState ,useEffect , useContext} from 'react'

import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { MyContext } from '../../App';

import { GiCash } from "react-icons/gi";
import { FiTrash2, FiSave, FiBookOpen} from "react-icons/fi"
import { IoIosCash } from "react-icons/io"
import { GoCreditCard } from "react-icons/go"
import { AiFillCaretRight } from "react-icons/ai"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { addBill } from '../DBconn'

function PaymentDialogue({open, closeD, items}) {
    const getSumToal = () =>{
        var res = 0
        items.map(el => {
            res+=el.price*el.stock
        })
        return res
    }
    const sum = getSumToal()
    
    const defaultState= {variant: open.cc, cash: sum, card: 0}


    
    const cx = useContext(MyContext)
    const [state,setState] = useState({})
    const decLg = (en, ro) => {
      if(cx.lg=='en')
          return en
      else
          return ro
    } 

    useEffect(() => {
        setState(defaultState)
    }, [])

    
    const payCash = () =>{
        setState({...state, variant: 'cash'})
    }
    const payCard = () =>{
        setState({...state, variant: 'card'})
    }
    const payMix = (cardam, casham) =>{
        setState({...state, variant: 'mix'})
    }
    const setCash = e => {
        setState({...state, cash: e.currentTarget.value})
    }
    const setCard = e => {
        setState({...state, card: e.currentTarget.value})
    }

    
    const handleClose = () =>{
        setState(defaultState)
        closeD()
    }

    const generateRecepit = (items, cashAmunt,cardAmount)=>{
        var recipt = 'CF^RO 123456\n'
        items.forEach( item => {
            recipt +='S^' + item.name + '^'
                + item.price*100 + '^'
                + item.stock*1000 + '^'
                + '1^1\n'
        })
        if (cashAmunt != 0 )
            recipt += 'P^1^' + cashAmunt*100 + '\n'
        if (cardAmount != 0 )
            recipt += 'P^2^' + cardAmount*100 + '\n'
        recipt+='ST^\nTL^\nTL^' //subtotal + empty row + empty row
        return recipt
    }
    const  makePayment = ()=>{
        if(state.variant == 'mix' && state.cash + state.card != sum) {
            alert(decLg(`Cash and Card added up have to be ${sum}`,`Suma Cash si Card trebuie sa fie ${sum}`))
            return
        }
        const bill = generateRecepit(items, state.cash, state.card)
        addBill(bill)
        handleClose()
    }



    const displayItems = () =>{
        var ret = []
        items.map(item=>{
            ret.push(
                <ListItem>
                    <ListItemAvatar>
                        <AiFillCaretRight />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={`${decLg('No: ','Nr: ')} ${item.stock}; ${decLg('Price: ','Pret: ')}${item.price}`} />
                </ListItem>
            )
        })
        return ret
    }
    const genContent  = () =>{
        if(state.variant=='mix'){
            return(
                <div style={{height: 200, background: '#fff3de'}}>
                    <GridRow>
                        <GridColumn m ='m' width ={6}>
                            <div style={{overflow: 'auto', maxHeight:150 }}>
                            <List >
                                {displayItems()}
                            </List>
                            </div>
                        </GridColumn>

                        <GridColumn textAlign   ='center' p='s'>
                            <GridColumn p ='s'><h7>Total: {sum}</h7></GridColumn>

                            <GridColumn p ='s'>
                            <FormControl>
                                <InputLabel htmlFor="component-simple">Cash</InputLabel>
                            <Input 
                                type='number'
                                inputProps={{min: 1, style: { textAlign: 'center' }}}
                                value={state.cash}
                                onChange={setCash}      
                            />  
                            </FormControl>
                            </GridColumn>

                            <GridColumn p ='s'>
                            <FormControl>
                            <InputLabel htmlFor="component-simple">Card</InputLabel>
                            <Input 
                                    type='number'
                                    inputProps={{min: 1, style: { textAlign: 'center' }}}
                                    value={state.card}
                                    onChange={setCard}
                                />
                            </FormControl></GridColumn>
                            
                        
                        </GridColumn>
                    </GridRow>                    
                </div>
            )
        } else {
            return (
                <div style={{height: 200, background: '#fff3de'}}>
                    <GridRow>
                        <GridColumn m ='m' width={6}>
                            <div style={{overflow: 'auto', maxHeight:150 }}>
                            <List>
                                {displayItems()}
                            </List>
                            </div>
                        </GridColumn>
                        <GridColumn m ='m' textAlign='center' p ='xl'>
                            <h7>Total: {sum}</h7>
                        </GridColumn>
                    </GridRow>
                </div>
            )
        } 
    }

    return (
        <Dialog open={open.on} 
                onClose={handleClose}
                maxWidth='sm' 
                fullWidth={true}
                >
            <form onSubmit={makePayment}>
            <DialogTitle id="form-dialog-title">
                <h2 style={{color:'#00539CFF'}}>
                    {decLg('Finalize Order','Finalizeaza Comanda')}
                </h2>
            </DialogTitle>
            <DialogContent>

                {genContent()}
                <GridRow style={{margin: 2}}>
                    <GridColumn width ={5} ml='xs' mr ='xs'>
                        <Button className = 'cart_svlist'
                                variant={state.variant=='cash'?'contained':'outlined'} 
                                color="primary"
                                size="large"
                                startIcon={<IoIosCash />}
                                onClick={payCash}
                                >
                                Cash
                        </Button>
                    </GridColumn>
                    <GridColumn width={5} ml='xs' mr ='xs'>
                        <Button className = 'cart_svlist'
                            variant={state.variant=='card'?'contained':'outlined'} 
                            color="primary"
                            size="large"
                            startIcon={<GoCreditCard />}
                            onClick={payCard}
                            >
                            Card
                        </Button>
                    </GridColumn>
                    
                    <GridColumn width={1} ml='xs' mr ='xs'>
                        <Button className = 'cart_svlist'
                            variant={state.variant=='mix'?'contained':'outlined'} 
                            color="primary"
                            size="small"
                            // style={{ width: 20}}
                            startIcon={<GiCash />}
                            onClick={payMix}
                            >
                            CC
                        </Button>
                    </GridColumn>
                </GridRow>
            </DialogContent>
            <DialogActions>
                <Button style ={{textTransform: 'none', background:'rgb(255, 185, 150)'}}
                    onClick={handleClose} 
                    color="secondary" variant="contained">
                        <h3>
                            {decLg('Cancel', 'Anuleaza')}
                        </h3>
                </Button>
                <Button  style ={{textTransform: 'none', background: '#7cfc9a'}}
                    onClick={makePayment}
                    color="primary" variant="outlined" 
                  >
                        <h3>
                            {decLg('Print Receipt', 'Printeaza Bon')}
                        </h3>
                </Button>
            </DialogActions>
            </form>
        </Dialog>
    )
}

export default PaymentDialogue
