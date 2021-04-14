import {  useState, useContext, useEffect } from 'react'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Input from '@material-ui/core/Input'
import Switch from '@material-ui/core/Switch'


import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

import { addAppointment, DeleteAppointment } from '../../../../DBconn'
import { GridColumn, GridRow } from 'emotion-flex-grid'
import { MyContext } from '../../../../../App'
import ShowAppointment from '../../../../../containers/appointments/ShowAppointment'
import PickField from '../PickField'
import PickDate from '../PickDate'
import PickClinetandNr from '../PickClinetandNr'
import OrangePaper from '../../../../../containers/papers/OrangePaper'


//this has to be renamed to Show App dialogue
function AddDummyApp({open,closeDummyAppDialog, app, deteleApp}) {
    const C = useStyles()    
    const cx = useContext(MyContext)
    const decLg = (en, ro) => {
        if(cx.lg=='en')
            return en
        else
            return ro
    }

    const handleClose = () => {
        closeDummyAppDialog()
    }

    const DellApp = () => {
        DeleteAppointment(app)
        // console.log(app)
        closeDummyAppDialog()
        // if(checkOut(crtApp) == true){
        //     addAppointment(crtApp)
        //     setCrtApp(defaultApp)
        // }
    }



    return (
        <Dialog open={open} 
                onClose={handleClose}
                maxWidth='l' 
                // fullWidth={true}
                >
            <form onSubmit={handleClose}>
            {/* <DialogTitle id="form-dialog-title">
                <h2 style={{color:'#00539CFF'}}>
                    {decLg('Make An Appointment','Creeaza o Rezervare')}
                </h2>
            </DialogTitle> */}
            <DialogContent>
                {/* <DialogContentText>
                    Some Fields are obligatory, some not
                </DialogContentText> */}
                <GridRow>
                    <GridColumn>
                        <h2 style={{color:'#00539CFF', fontSize:32}}>
                            {decLg('View Appointment','Vezi Rezervarea')}
                        </h2><br/>
                        <OrangePaper>
                            <ShowAppointment app={app} />
                        </OrangePaper>
                    </GridColumn>
                </GridRow>
                
            </DialogContent>
            <DialogActions>
                <Button  style ={{textTransform: 'none', background: '#eb5b60'}} 
                    color="primary" variant="outlined"  onClick={()=>DellApp()}>{/*type="submit" */}
                        <h3>
                            {decLg('Delete Appointment', 'Anuleaza Rezervarea')}
                        </h3>
                </Button>
                <Button style ={{textTransform: 'none', background:'rgb(255, 185, 150)'}} 
                    onClick={handleClose} color="secondary" variant="contained">
                        <h3>
                            {decLg('Cancel', 'Inchide')}
                        </h3>
                </Button>
            </DialogActions>
            </form>
        </Dialog>
    )
}

const useStyles = makeStyles({
    infolilbox:{
        width: 200,

    },
    timeselectopt:{
        textAlign: 'center'
    },

    inputbox:{
        width:253,
        textAlign: 'center',
    }
  })




export default AddDummyApp
