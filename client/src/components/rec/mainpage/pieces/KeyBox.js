import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'


import { css }  from '@emotion/css'

function KeyBox({crtKey, unFocus}) {
    const C = useStyles()

    const decideStatusColor = () =>{
        if(crtKey.id == 0)
            return C.awaitingKey
        else if(crtKey.assigned == false )
            return C.justUnloked
        else
            return C.keyGiven
    }

    

    return (
        <Paper elevation={2} 
            onClick = {unFocus}
            className={`${C.boxx} ${decideStatusColor()}`}
            >
            {/* {console.log(crtKey)} */}
            <h2>{crtKey.id}</h2>
        </Paper>
    )
}


const useStyles = makeStyles({
    boxx: {
    //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      height: 125,
      width: 125,
    },

    orangeShadow: {
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
    },

    keyGiven:{
        boxShadow: ' 0px 0px 39px -5px rgba(250,13,13,1)',

    },

    awaitingKey:{
        boxShadow: '0px 0px 39px -2px rgba(54,250,15,1)',
    },

    justUnloked: {
        boxShadow: '0px 0px 39px -2px #56b32e',
    },




    

  }); 

export default KeyBox
