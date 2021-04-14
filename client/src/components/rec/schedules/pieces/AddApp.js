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

import { addAppointment } from '../../../DBconn'
import { MyContext } from '../../../../App'
import { GridColumn, GridRow } from 'emotion-flex-grid'
import PickDate from './PickDate';
import PickField from './PickField'
import OrangePaper from '../../../../containers/papers/OrangePaper'
import ShowAppointment from '../../../../containers/appointments/ShowAppointment'
import PickClinetandNr from './PickClinetandNr'

import {formatDate} from './DatesMethods'
import PickNamePhone from '../../../../containers/inputs/PickNamePhone'


function AddApp({open,closeAppDialog, info}) {
    // console.log(info)
    const C = useStyles()    
    const cx = useContext(MyContext)
    const decLg = (en, ro) => {
        if(cx.lg=='en')
            return en
        else
            return ro
    }

    const topSetDate = (date)=>{
        setCrtApp({...crtApp, date: formatDate(date)})
    }

    
    const [crtApp, setCrtApp]= useState(defaultApp)
    // useEffect(() => {
    //     setCrtApp({...crtApp,
    //         field: info.field, 
    //         time: info.time, 
    //         date:info.date
    //         })
    // }, [])

    useEffect(()=>{console.log(crtApp)},[crtApp])

    const changeAppStatus = e => {
        console.log(e.target.value)
        setCrtApp({...crtApp, status: e.target.value})
    }

    const changeAppTime = e =>{
        console.log(e.target.value)
        setCrtApp({...crtApp, time: tymes.indexOf(e.target.value)})
    }


    const handleClose = () => {
        closeAppDialog()
    }

    const makeAppointment = () => {
        closeAppDialog()
        // if(checkOut(crtApp) == true){
        //     addAppointment(crtApp)
        //     setCrtApp(defaultApp)
        // }
    }

    const typeOptions = info.var =='all'?[
        // ['cw',decLg('Client Waiting','Client in asteptare')],
        // ['acc',decLg('Awaiting client confirmation ','Astepata cornfirmare client')],
        ['oc','Ocasional'],
        ['sub',decLg('Subscription','Abonament')],
        ['corp',decLg('Corporation','Firma')],
        ['tr',decLg('Trainer','Antrenor')]
        ]:[
        ['cw',decLg('Client Waiting','Client in asteptare')],
        ['acc',decLg('Awaiting client confirmation ','Astepata cornfirmare client')]
    ]
        

    const DialogContenence = () => {
        return(
            <div>
                {PickName()}
                {PickHourRow()}
                {PickAppTypeRow()}
                {PickFieldRow()}
                {PickTimeRow()}
                {PickDurationRow()}
                {/* <PickClinetandNr /> */}
            </div>
        )
    }

    const PickHourRow = () => {
        return(
            <GridRow>
                <GridColumn p='m' align='center' width={5}>
                    <h3>{decLg('Appointment date: ','Data Rezervarii:')}</h3>
                </GridColumn>
                <GridColumn m='m'>
                    {/* {console.log(info)} */}
                    <h3>{info.date}</h3>{/* maybe make this prettier */}
                    {/* <PickDate date={crtApp.date} changeDate={topSetDate} /> */}
                </GridColumn>
            </GridRow>
        )
    }

    const setNameandPhone = (inNP) =>{
        setCrtApp({...crtApp, name: inNP.name, phone: inNP.phone})
    }

    const PickName = () =>{
        return(
            <GridRow>
                <GridColumn p='m' align='center' width={5}>
                    <h3>{decLg('Clinet Name and Phone: ','Nume si Telefon Client:')}</h3>
                </GridColumn>
                <GridColumn  p='m' align='center' width={5}>
                    <PickNamePhone setNamePhone={setNameandPhone}/>
                </GridColumn>
            </GridRow>
        )
    }

    const PickAppTypeRow = () => {
        return(
            <GridRow>
                <GridColumn p='m' align='center' width={5}>
                    <h3>{decLg('Appointment Type: ','Tip Rezervare:')}</h3>
                </GridColumn>
                <GridColumn>
                    <FormControl >
                        <InputLabel >{decLg('Appointment Type','Tip Rezervare')}</InputLabel>
                        <Select
                            className={C.inputbox}
                            value={crtApp.status}
                            onChange={changeAppStatus}
                            >
                            {typeOptions.map(el=>{
                                return(
                                    <MenuItem value={el[0]}>{el[1]}</MenuItem>
                                )})
                            }
                        </Select>
                    </FormControl>
                </GridColumn>
            </GridRow>
        )
    }

    const PickFieldRow = () => {
        return(
            <GridRow>
                <GridColumn p='m' align='center' width={5}>
                    <h3>{decLg('Pick Field: ','Alege Teren:')}</h3>
                </GridColumn>
                <GridColumn m='m'>
                    <PickField field={info.field} />
                </GridColumn>
            </GridRow>
        )
    }

    const PickTimeRow = () => {
        return(
            <GridRow>
                <GridColumn p='m'  align='center' width={5}>
                    <h3>{decLg('Appointment Time: ','Ora Rezervarii:')}</h3>
                </GridColumn>
                <GridColumn m='m'>
                    <h3>{tymes[info.time]}</h3>
                </GridColumn>
            </GridRow>
        )
    }

    const changeAppduration = e =>{
        // console.log(e.target.value)
        var aux = 1 + e.target.value
        setCrtApp({...crtApp, duration: aux})
    }

    const PickDurationRow = () => {
        return(
            <GridRow>
                <GridColumn p='m' align='center' width={5}>
                    <h3>{decLg('Pick appointment duration:','Alege durata rezervarii:')}</h3>
                </GridColumn>
                <GridColumn m='m'>
                    <FormControl align='center'>
                            <InputLabel >{decLg('Apointment Duration','Lungime Rezervare')}</InputLabel>
                            <Select
                                className={C.inputbox}
                                value={crtApp.duration} 
                                onChange={changeAppduration}
                                >
                                    {/* {console.log(tymes)} */}
                                    {durations.slice(0,info.maxLenght).map((el, index)=>{
                                        return(
                                            <MenuItem value={index}>{el}</MenuItem>
                                        )
                                    })}
                            </Select>
                        </FormControl>
                </GridColumn>
            </GridRow>
        )
    }



    return (
        <Dialog open={open} 
                onClose={handleClose}
                maxWidth='lg' 
                fullWidth={true}
                >
            <form onSubmit={makeAppointment}>
            {/* <DialogTitle id="form-dialog-title">
                <h2 style={{color:'#00539CFF'}}>
                    {decLg('Make An Appointment','Creeaza o Rezervare')}
                </h2>
            </DialogTitle> */}
            <DialogContent>

                <GridRow>
                    <GridColumn>
                        <h2 style={{color:'#00539CFF',fontSize:32}}>
                            {info.var=='all'?   decLg('Make An Appointment','Creeaza o Rezervare'):
                            decLg('Make an Awaitting Appointment','Creeaza o Rezervare in asteptare')}
                        </h2><br/>
                        <OrangePaper>
                            {DialogContenence()}
                        </OrangePaper>
                    </GridColumn>

                    <GridColumn>
                        <h2 style={{color:'#00539CFF', fontSize:32}}>
                            {decLg('Review Appointment','Verifica Rezervare')}
                        </h2><br/>
                        <OrangePaper>
                            <ShowAppointment  app={{...crtApp, ...info}} />
                        </OrangePaper>
                    </GridColumn>
                </GridRow>
                
            </DialogContent>
            <DialogActions>
                <Button style ={{textTransform: 'none', background:'rgb(255, 185, 150)'}} onClick={handleClose} color="secondary" variant="contained">
                        <h3>
                            {decLg('Cancel', 'Anuleaza')}
                        </h3>
                </Button>
                <Button  style ={{textTransform: 'none', background: '#7cfc9a'}} color="primary" variant="outlined"  onClick={makeAppointment}>{/*type="submit" */}
                        <h3>
                            {decLg('Create Appointmen', 'Creaza rezerare')}
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

  const defaultApp = {
    time: 0,
    name: '',
    field: '',
    date: '' ,
    status: ``,
    duration: 0,
    time: 0,
    phone: '005',
}
const durations = [
    '30 min',
    '60 min 1 ora',
    '90 min',
    '120 min 2 ore',
    '150 min',
    '180 min 3 ore',
    '210 min',
    '240 min 4 ore',
    '270 min',
    '300 min 5 ore',
    '330 min',
    '360 min 6 ore',
    '390 min',
    '420 min 7 ore',
]

const tymes = [//'Times',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',        
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',        
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
        '00:00',
        '00:30',
        '01:00',
        '01:30',
    ]

export default AddApp


