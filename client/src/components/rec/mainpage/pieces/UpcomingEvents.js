import React from 'react'



import Paper from '@material-ui/core/Paper'

import { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

function UpcomingEvents() {
    
    const C = useStyles()
    
    return (
        <div > 
            <h1>Upcomming events</h1>
        </div>
    )
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

export default UpcomingEvents