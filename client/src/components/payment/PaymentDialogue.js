import Button from '@material-ui/core/Button'
import { GridRow, GridColumn} from 'emotion-flex-grid'
import {useState, useContext} from 'react'

import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { MyContext } from '../../App';


function PaymentDialogue({open, closeD, variant}) {

    
    const cx = useContext(MyContext)
    const decLg = (en, ro) => {
      if(cx.lg=='en')
          return en
      else
          return ro
    } 

    const finalize =()=>{
        //this will haev to send the recipt to the catcher and wait for confimation
    }

    const genContent  = () =>{
        if(variant=='cash'){
            return(
                <div>
                    
                </div>
            )
        } else if(variant=='card'){
            return(
                <div>

                </div>
            )
        } else if(variant=='mix'){
            return(
                <div>
                    
                </div>
            )
        }
    }

    const handleClose = () =>{
        closeD()
    }

    const  makePayment = ()=>{
        
    }

    return (
        <Dialog open={open} 
                onClose={handleClose}
                maxWidth='lg' 
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
