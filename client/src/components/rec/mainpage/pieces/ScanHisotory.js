import React from 'react'

import Paper from '@material-ui/core/Paper'

import { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'


const dateToDisplay = (date) => {
    const auxMonth = date.getMonth() + 1
    var res = ''
    res+= date.getHours()+':'+date.getMinutes()+' '
    res+= date.getDate() +'-'+ auxMonth +'-' + date.getFullYear()
    return res
}

function ScanHisotory({entries}) {

    
    const C = useStyles()

    return (
        <div > 
            <h1>Entry History</h1>
            {entries.map(entry => {
                if(entry.assigned == undefined)
                    return checkedInPerson(entry)
                else 
                    return checkedOutKey(entry)
            })}
            
        </div>
    )
}

const checkedInPerson = (person) =>{
    return (
        <div>
            <h3> {person.name} </h3> checked in at {dateToDisplay(person.timeofEntry)}
        </div>
    )

}

const checkedOutKey = () =>{

}

const useStyles = makeStyles({
paper: {
    boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
    height: 400,
    width:  600,
    padding: 15,
    height: 500, 
    overflow: 'auto',
},
}); 

export default ScanHisotory
