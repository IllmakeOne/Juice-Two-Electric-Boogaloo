import { useState, useContext, useEffect } from 'react'
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import { getAppsByWeek,getWeeklyApps, getGhostAppsbyWeek } from '../../../DBconn'
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
    timeLight, setTimeLight, rowLight, setRowLight, variant, apps}) => {

    const cx = useContext(MyContext) 

    const C = useStyles()

    const week = getWeek(today,weekMutiplier, cx.lg)

    const _mouseMove = (id) => {
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

    const getmaxappLengh = (timestart, court, lineapps) => {
        var res = 0
        var i 
        for(i = timestart ; i < (38-timestart);i++){
            const nextone=lineapps.filter(el => el.time==i)
            if (nextone.length != 0){
                return res
            }
            res++
        }
        return res
    }

    const generateLine = (lineapps, date) => {
        var ret = []
        var i
        for ( i = 0;i < dayLenght ; i++){
            const aux = lineapps.filter(el => el.time==i)
            // console.log(aux)
            if (aux.length != 0){
                // if (false){
                const el = aux[0]
                
                i+= el.duration

                const height = (el.duration +1) * 25
                ret.push(
                    <Paper elevation={3} style={{height:height }} 
                        onClick={()=>_mouseMove(el.time)}
                        onDoubleClick={()=>(showapp(el))}
                        >
                        <FullCell app={el} />
                    </Paper>)

            } else {//if there is nothing scheudle for this hour
                const auxi = i
                const hilit = auxi==rowLight?'solid ':''
                ret.push(
                    <Paper 
                        elevation={2} 
                        onDoubleClick = {()=>onDubClick(auxi, date, field,getmaxappLengh(auxi, field, lineapps))}
                        onClick={()=>_mouseMove(auxi)}
                        style={{border: `2px ${hilit}#FFB231`, 
                                margin: 0}}
                        >
                            <EmptyCell i={i}/> 
                    </Paper>
                    )
            }
        }
        return ret
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
                {week.map((el, index)=>{
                    const aux = apps.filter(a=>a.date == el[1] || a.date == (index +1))
                    return(
                        <GridColumn width={12/7} className = {C.column}> 
                        
                            <Paper elevation={3} className={C.daynameCell}>
                                {el[0]}<br/>{el[1]}
                            </Paper> 
                            {generateLine(aux, el[1])}
                        
                            <Paper elevation={3} className={C.daynameBottom}>
                                    {el[1]}
                            </Paper>  
            
                        </GridColumn>   
                    )
                    // const aux = []
                    // return(
                    //     <ColumnDateField
                    //         apps= {aux}
                    //         rowLight={rowLight}
                    //         date={el[1]}
                    //         name={el[0]}
                    //         field={field} 
                    //         _mouseMove={onMouseclick}
                    //         onDubClick={onDubClick}
                    //         openShowApp={showapp}
                    //         dayofWeek = {index}
                    //     />                     
                    // )
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

    },

    lit:{
        border: 5,
        borderColor: 'yellow',
        background: 'red',
    },
    column:{
        margin: 3,
    },
    daynameCell:{
        background: '#0cbff5',    
        height: 60,   
        textAlign: 'center',
        fontSize: 23,

        position: 'sticky',
        top: 73,
    },

    daynameBottom:{
        background: '#0cbff5',    
        height: 30,   
        textAlign: 'center',
        fontSize: 23,
        position: 'sticky',
        bottom: 5,
    },
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
