import React from 'react'

import {  Paper } from '@material-ui/core'

import { css, cx } from '@emotion/css'

function EmptyCell({i}) {
    const auxcolor = i%2==0?'#ffe6cc':'#fff' 
    // const aux= id%2==0? 'cellwhite':'cellgrey'
    return (
        <Paper elevation={1} 
        // style={
        //     {height: 25,
        //      textAlign: 'center',
        //      background: auxcolor}}
        // onMouseEnter={()=>onHoover()}
        // onClick={()=>abprt(aux)} 
        className = {css`
        height: 25px;
        background-color: ${auxcolor};
        font-size: 24px;
        border-radius: 4px;
        &:hover {
            border-style: solid;
            border-width: 2px;
            border-color: rgb(100, 125, 235);
        }
      `}
            >
            
        </Paper>
    )
}

export default EmptyCell
