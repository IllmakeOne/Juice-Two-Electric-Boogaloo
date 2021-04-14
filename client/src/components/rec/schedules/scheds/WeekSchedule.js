import { useState, useContext } from 'react'
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import { fetchApprow } from '../../../DBconn'
import Paper  from '@material-ui/core/Paper'

import { makeStyles } from '@material-ui/core/styles'      
import FullCell from '../cells/FullCell'    
import EmptyCell from '../cells/EmptyCell'
import ColumnDateField from '../pieces/ColumnDateField'


import TimesRow from '../pieces/TimesRow'
import  { getWeek } from '../pieces/DatesMethods'

import { MyContext } from '../../../../App'
import SticckyDateNames from '../pieces/shedspieces/SticckyDateNames'
import FullColumn from '../pieces/shedspieces/FullColumn'

 

const WeekSchedule = ( {field,today, weekMutiplier, setDialog, openShowApp,
    timeLight, setTimeLight, rowLight, setRowLight, variant}) => {
    const cx = useContext(MyContext) 

    const C = useStyles()

    const week = getWeek(today,weekMutiplier, cx.lg)

    const onMouseclick = (id) => {
        setTimeLight(id)
    }

    const onDubClick = (id, date, fieldd, maxL) => {
        setDialog(id, date,fieldd, variant, maxL)
    }

    const auxRowLight = (id)=>{
        setRowLight(id)
    }

    const showapp = app => {
        openShowApp(app)
    }

    const wheelcahngeHighlight = change =>{
        const aux = rowLight + change
        setRowLight(aux<0?-1:aux)
    }


       return (

        <div className='' >
            
            <GridRow wrap='wrap' >
                <GridColumn  className = {C.column}>
                    <TimesRow
                        timeHighlight={timeLight}
                        onCellClick ={setRowLight}
                        upMouseScroll={wheelcahngeHighlight}
                        />
                    </GridColumn>
                
                <GridRow className={C.midrow} >
                {week.map((el)=>{
                    return(
                        <ColumnDateField
                            variant={variant}
                            rowLight={rowLight}
                            date={el[1]}
                            name={el[0]}
                            field={field} 
                            _mouseMove={onMouseclick}
                            onDubClick={onDubClick}
                            openShowApp={showapp}
                        />                     
                    )
                })}
                </GridRow>

                <GridColumn className = {C.column}>
                    <TimesRow 
                        timeHighlight={timeLight} 
                        onCellClick = {auxRowLight}
                        upMouseScroll={wheelcahngeHighlight}
                        />
                </GridColumn>
            </GridRow>
        </div>
       )
}








const useStyles = makeStyles({
    column:{
        margin: 3,
    },

    
    midrow: {
        width: '80%',
    },

    cellocasional:{
        border: 'solid',
        borderWidth: 1,
        borderColor: '#f28313',
        textAlign: 'center',
        height: '100%',
        borderRadious: '1px',
        background: 'rgb(79, 248, 1)',
    },

    cellsub:{
        border: 'solid',
        borderWidth: 1,
        borderColor: '#f28313',
        textAlign: 'center',
        height: '100%',
        borderRadious: '1px',
        background: '#f4ff94',
    },

    celltrainer:{
        border: 'solid',
        borderWidth: 1,
        borderColor: '#f28313',
        textAlign: 'center',
        height: '100%',
        borderRadious: '1px',
        background: '#0aeefa    ',
    },

    emptycell:{
        background: 'white',    
        height: 25,   
        textAlign: 'center',
    },

    timeCellHighlight:{
        background: 'white',    
        height: 25,   
        textAlign: 'center',
        
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgb(100, 125, 235)'
    },

    daynameCell:{
        background: '#0cbff5',    
        height: 60,   
        // borderLeft: 'solid',
        // borderRight: 'solid',
        // borderWidth: 1,
        textAlign: 'center',
        fontSize: 23,

        position: 'sticky',
        top: 73,

    }
  });

  const dayLenght = 38 //it is counted in half hours 
    const weekDays=[//this will be made into a function for the current day
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday']
        
    const zileleSaptamanii=[
        'Luni', 
        'Marti',
        'Miercuri',
        'Vineri', 
        'Sambata',
        'Duminica']

export default WeekSchedule
