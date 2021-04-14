import React, {  Children, useState } from 'react'
import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import { red } from '@material-ui/core/colors'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function SubHBox({sub}) {

    const dateToText = (date) =>{
        var rest = date.getDate()+'-'
        rest += (date.getMonth() + 1) + '-'
        rest += date.getFullYear()
        return rest
    }

    const reverseString = (string) =>{
        return string.split('').reverse().join('')
    }

    /**
     * This Need REWORK, after db is changed so it uses dates not dumb strings
     * 
     * @returns 
     */
    const determineExpired = () =>{
        console.log(today)
        const revTodauy = reverseString(today)
        console.log(revTodauy)

        console.log(sub.end)
        const revnd = reverseString(sub.end)
        console.log(revnd)
        console.log(sub.end.localeCompare(today))
        if(sub.left == 0) { 
            return classes.expired
        } else if(revnd.localeCompare(revTodauy)==-1) { 
            return classes.expired
        } else { 
            return classes.available
        } 
    }



    const today = dateToText(new Date)
    const classes = useStyles()
    const color = determineExpired()
    // console.log(sub.end+ ' '+ today + ' '+ sub.end.localeCompare(today))



    return (
        <div className={`${color} ${classes.subBox}`}>
        {/* // <div className = { color}> */}
            <GridRow>
                <GridColumn width={6}>
                    <h3>{sub.type}</h3>
                    <h3>{sub.left!=-1?`Entries left: ${sub.left}`:'\n'}</h3>
                </GridColumn>
                <GridColumn>
                    <h3>Start: {sub.start}</h3>
                    <h3>End: {sub.end}</h3>
                </GridColumn>
                <GridColumn>
                
                </GridColumn>
                
            </GridRow>
        </div>
    )
}





const useStyles = makeStyles({
    expired: {
        // boxShadow: '0px 0px 14px 5px rgba(235,60,17,1)',
        borderColor: 'rgba(235,60,17,1)',
    },
    available: {
        // boxShadow: '0px 0px 14px 5px rgba(62,235,18,1)',
        borderColor: 'rgba(62,235,18,1)',
    },
    subBox: {
        width: '100%',
        height: 100,
        borderStyle: 'inset',
        borderWidth: 8,
    },

})

export default SubHBox
