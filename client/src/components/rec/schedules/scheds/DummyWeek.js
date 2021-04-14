import { useState, useContext, useEffect } from 'react'
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import { fetchApprow } from '../../../DBconn'
import { Button, Paper } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'      
import FullCell from '../cells/FullCell'    
import EmptyCell from '../cells/EmptyCell'
import ColumnDateField from '../pieces/ColumnDateField'

import TimesRow from '../pieces/TimesRow'
import FullColumn from '../pieces/shedspieces/FullColumn'

import  { getWeek } from '../pieces/DatesMethods'

import { MyContext } from '../../../../App'

function DummyWeek({field,today, weekMutiplier, setDialog,
                timeLight, setTimeLight, rowLight, setRowLight}) {

    const cx = useContext(MyContext) 

    const C = useStyles()
    const week = getWeek(today,weekMutiplier, cx.lg)

    const [litRow, setLitRow] = useState(rowLight)
    
    useEffect(() => {
        setRowLight(litRow) 
        console.log(litRow)
    }, [litRow])

    const onMouseclick = (id) => {
        setTimeLight(id)
    }

    const onDubClick = (id, date, fieldd) => {
        setDialog(id, date, fieldd)
    }
    // const auxRowLight = (id)=>{
    //     setRowLight(id)
    // }


    return (
        <div className=''>
            
            <GridRow wrap='wrap' >
                <GridColumn className = {C.column}>
                    <TimesRow 
                        timeHighlight={timeLight} 
                        onCellClick ={setLitRow}
                        />
                </GridColumn>

                <GridRow className={C.midrow}>
                {week.map((el)=>{
                    return( 
                        <FullColumn
                            rowLight={rowLight}
                            date={{date: el[1], name:el[0]}}
                            field={field} 
                            _mouseMove={onMouseclick}
                            onDubClick={onDubClick}
                        
                        />                     
                    )
                })}
                </GridRow>
                
                <GridColumn className = {C.column}>
                    <TimesRow 
                        timeHighlight={timeLight} 
                        onCellClick ={setLitRow}
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
        textAlign: 'center',
        fontSize: 23,

        position: 'sticky',
        bottom: 73,
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
    



export default DummyWeek
