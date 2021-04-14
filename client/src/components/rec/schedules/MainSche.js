import { useState, useContext, useEffect } from 'react'
import ScheduleTabs from './pieces/ScheduleTabs'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { fetchAppoitments, fetchApprow} from '../../DBconn'
import { GridRow, GridColumn } from 'emotion-flex-grid'


import WeekSchedule from '../schedules/scheds/WeekSchedule'
import FieldChanger from './pieces/FieldChanger'
import DateChanger from './pieces/DateChanger'
import AddApp from './pieces/AddApp'
import { MyContext } from '../../../App'
import { getWeek } from './pieces/DatesMethods'
import DummyWeek from './scheds/DummyWeek'
import FieldAndDateChanger from './pieces/shedspieces/FieldAndDateChanger'
import AddDummyApp from './pieces/shedspieces/AddDummyApp'



export const FIELDS = {
    T1: 'Tennis 1',
    T2: 'Tennis 2',
    T3: 'Tennis 3',
    OD: 'OutDoor',
}
export const area = ['Tennis 1','Tennis 2','Tennis 3','OutDoor', 'Tennis']


function MainSche() {
    const cx = useContext(MyContext) 

    
    const [open, setOpen] = useState(false)
    const [showAOpen, setShowAOpen] = useState(false)
    
    const [crtField, setCrtField] = useState('Hall')
    const [today, setToday] = useState(new Date)
    const [weekMutiplier, setWeekMutiplier] = useState(0)
    const [info, setInfo] = useState({})
    
    const [appShow, setAppShow] = useState({})

    const[timeLight, setTimeLight] = useState(-1)
    const[rowLight, setRowLight] = useState(-1)

    const changeToday = (newDate) =>{
        setToday(newDate)
        setWeekMutiplier(0)
        // console.log(newDate)
    }

    const changeTimeLight =(id)=>{
        setTimeLight(id)
    }

    const changeRowLight =(id)=>{
        // console.log(id)
        if(rowLight ==  id)
            setRowLight(-1)
        else 
            setRowLight(id)
    }

    const changeWeekMultiplier = (newmult) => {
        setWeekMutiplier(newmult)
    }

    const chageField = (newF) =>{
        setCrtField(newF)
    }

    const openAppDialog = (id, date, fieldd, variant,maxL) =>{
        setInfo({time: id, date: date, var: variant, field:fieldd, maxLenght: maxL})
        setOpen(true)
    }
    
    const closeAppDialog = () => {
        setOpen(false)
    }

    const openShowApp = (app) =>{
        setAppShow(app)
        setShowAOpen(true)
    }
    const closeShowAopen= ()=>{
        setShowAOpen(false)
    }

    return (
        <div className='cart_svlist' >
        <br/>
            <br/>
            <br/>
            <br/>

            <FieldAndDateChanger 
                changeField = {chageField}
                weekMutiplier = {weekMutiplier}
                changeDateMultiplier = {changeWeekMultiplier}
                today = {today}
                changeToday = {changeToday}
                />


            <WeekSchedule 
                variant='all'
                field = {crtField} 
                today = {today}
                weekMutiplier = {weekMutiplier}
                setDialog = {openAppDialog}
                openShowApp = {openShowApp}
                
                setTimeLight={changeTimeLight}
                timeLight={timeLight}
                setRowLight={changeRowLight}
                rowLight={rowLight}
                />

            <FieldAndDateChanger 
                changeField = {chageField}
                weekMutiplier = {weekMutiplier}
                changeDateMultiplier = {changeWeekMultiplier}
                today = {today}
                changeToday = {changeToday}
                />
            
            <WeekSchedule 
                variant='dummy'
                field = {crtField} 
                today = {today}
                weekMutiplier = {weekMutiplier}
                setDialog = {openAppDialog}
                openShowApp = {openShowApp}
                
                setTimeLight={changeTimeLight}
                timeLight={timeLight}
                setRowLight={changeRowLight}
                rowLight={rowLight}
                />



            <AddApp 
                open = {open} 
                closeAppDialog = {closeAppDialog}
                info={info}
                />
                
            <AddDummyApp 
                open = {showAOpen} 
                closeDummyAppDialog = {closeShowAopen}
                app={appShow}
                />
        </div>
    )
}

export default MainSche
