import { useState, useContext, useEffect } from 'react'
import ScheduleTabs from './pieces/ScheduleTabs'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getApps, getWeeklyApps, addWeekAppointment} from '../../DBconn'
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
// import e from 'express'

const getNumberOfWeek = (today) => {
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

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


    const [ocases, setOcases] = useState([])
    const [weeklies, setWeeklies] = useState([])

    /*
    useEffect(() => {
        const getaaaaaApps = async ()=>{
            const thisweek = await getApps(crtField)
            console.log(thisweek)
            setOcases(thisweek)
        }
        const getWApps = async ()=>{
            const weeklys = await getWeeklyApps(crtField)
            setWeeklies(weeklys)      
        }
        getaaaaaApps()
        getWApps()
    }, [])
    */

    /*
    useEffect(()=>{
        const getaaaaaApps = async ()=>{
            const thisweek = await getApps(crtField)
            console.log('dab this week')
            console.log(thisweek)
            setOcases(thisweek)
        }
        const getWApps = async ()=>{
            const weeklys = await getWeeklyApps(crtField)
            console.log('dab weekly')
            console.log(weeklys)
            setWeeklies(weeklys)      
        }
    getaaaaaApps()
    getWApps()
    }, [crtField])
    */


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

    const addAppointmentDB = async (app) =>{
        console.log(app)
        const newapp = await addWeekAppointment(app)
        // console.log(newapp)  
        // if(newapp.weekly == false){
        //     ocases.push(newapp)
        //     setOcases(ocases)
        // } else {
        //     weeklies.push(newapp)
        //     setWeeklies(weeklies)
        // }
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
                apps = {ocases.filter(el=>el.status != 'cw' && el.status!= 'acc').concat(weeklies)}
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
                apps = {ocases.filter(el=> el.status == 'cw' || el.status == 'acc')}
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
                pushtoDB = {addAppointmentDB}
                info={info}
                />
                
            <AddDummyApp //show app
                open = {showAOpen} 
                closeDummyAppDialog = {closeShowAopen}
                app={appShow}
                />
        </div>
    )
}

export default MainSche
