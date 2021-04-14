import { GridColumn } from 'emotion-flex-grid'
import React from 'react'
import ColumnDateField from '../ColumnDateField'
import Paper  from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles' 

function FullColumn({field, date, _mouseMove, onDubClick, 
         rowLight, openShowApp}) {
    const C = useStyles()
    return (
            <GridColumn width={12/7} className = {C.column}> 
            
                <Paper elevation={3} className={C.daynameCell}>
                    {date.name}<br/>{date.date}
                </Paper>  
                
                <ColumnDateField
                        date= {date.date}
                        field= {field} 
                        _mouseMove ={_mouseMove}
                        onDubClick = {onDubClick}
                        rowLight={rowLight} 
                        openShowApp={openShowApp}
                        />

                <Paper elevation={3} className={C.daynameBottom}>
                    {date.date}
                </Paper>  

            </GridColumn>    
    )
}

const useStyles = makeStyles({
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
        bottom: 30,
    },
  })

export default FullColumn
