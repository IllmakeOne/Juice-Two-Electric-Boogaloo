import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { GridColumn, GridRow } from 'emotion-flex-grid'
import Paper from '@material-ui/core/Paper' 
import NewItem from './restocking/NewItem'
import AddStock from './restocking/AddStock'

function RestockMain() {
    const C = useStyles()
    return (
        <div className= 'ScreenElement'>
        <GridRow>
            <GridColumn p='m' >
                <Paper  elevation={3} className={C.paper}>
                    <NewItem />
                </Paper>
            </GridColumn>
            
            <GridColumn p='m' >
                <Paper  elevation={3} className={C.paper}>
                    <AddStock />
                </Paper>
            </GridColumn>
        </GridRow>

        <GridRow>
            <GridColumn p='m' >
                <Paper  elevation={3} className={C.paper}>
                    aaa
                </Paper>
            </GridColumn>
            
            <GridColumn p='m' >
                <Paper  elevation={3} className={C.paper}>
                    aa
                </Paper>
            </GridColumn>
        </GridRow>
            
        </div>
    )
}
const useStyles = makeStyles({

    scanner:{
        height: 400,
        width:  600,

    },
    
    paper: {
        boxShadow: '14px 14px 40px 0px rgba(250,228,140,1)',
        height: 400,
        width:  600,
        padding: 15,
        height: 500, 
        overflow: 'auto',
    },

  });
export default RestockMain
