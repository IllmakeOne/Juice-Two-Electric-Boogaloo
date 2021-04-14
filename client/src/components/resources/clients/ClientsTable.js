import React from 'react'

import { makeStyles } from '@material-ui/core/styles'      
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function ClientsTable({clients}) {

    const classes = useStyles()
    return (
        <div>
            <TableContainer component={Paper} className={classes.tablecontainer}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow >
                    <TableCell className={classes.topcell} align="center">Name   </TableCell>
                    <TableCell className={classes.topcell} align="center">Email</TableCell>
                    <TableCell className={classes.topcell} align="center">Phone</TableCell>
                    <TableCell className={classes.topcell} align="center">Subsription</TableCell>
                    <TableCell className={classes.topcell} align="center">Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clients.map((row,index) => (
                    <TableRow key={row.name} style ={ index % 2? { background : "#fdffe0" }:{ background : "white" }}>
                        <TableCell className={classes.cell} component="th" scope="row">{row.name} </TableCell>
                        <TableCell className={classes.cell} align="right">{row.email? row.email:'- - -'}</TableCell>
                        <TableCell className={classes.cell} align="right">{row.phone?row.phone:'- - -'}</TableCell>
                        <TableCell className={classes.cell} align="right">{row.crtsub.type}</TableCell>
                        <TableCell className={classes.cell} align="right">{row.comment}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

const useStyles = makeStyles({
    tablecontainer: {
        left: '12%',
        top: '10%',
        width: '100%',
        
        // width: 1250,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
    },
    table: {
        width: '100%',
    },

    cell:{
        fontFamily: 'Arial, Helvetica, sans-serif',
        // width: 200,
        // height: 50,
        textAlign: 'center',
        fontSize: 17,
        // background: 'rgb(255, 255, 230)',
        // borderRight: '1px solid orange',
        // borderLeft: '1px solid orange',
    },

    topcell:{
        textAlign: 'center',
        fontSize: 17,
        background: 'rgb(255, 255, 230)',        
        borderBottom: '2px solid orange'
    },
    
    shadow:{
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
    },

  });

export default ClientsTable
