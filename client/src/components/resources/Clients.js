
import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'      

import { Button, Input, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { fetchClients } from '../DBconn'


import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import Paper from '@material-ui/core/Paper';


import EditData from './clients/EditData';
import InfoTabs from './clients/InfoTabs';
import ClientsTable from './clients/ClientsTable';




function Clients() {
    const classes = useStyles();

    const [clients, setClients] = useState([])
    const [client, setClient] = useState(basicClient)


    useEffect(() =>{
        const getClients = async () => {
            const serverProds = await fetchClients()
            setClients(serverProds)
        }
        getClients()
    }, [])

    const onSubmit = () => {

        //send item to db
    }
    

   
    return (
        <div> <br/><br/><br/><br/>
            <br/>
                    
            <Paper  elevation={2} 
                className={`${classes.shadow} ${classes.clientPaper}`}>
                <GridRow  direction='row' wrap='wrap' >

                    <GridColumn width={4} p = 's'>
                        <div className={classes.clientData}>
                        <EditData 
                                clients = {clients && clients}
                                client={client} setClient={setClient} 
                                Submit = {onSubmit}/></div>
                    </GridColumn>


                    <GridColumn p = 'm' width = {8}>
                        {/* <InfoTabs/> */}
                    </GridColumn>

                </GridRow>
            </Paper>
            
               
        </div>
    )
}



const useStyles = makeStyles({
    clientData: {
        // width: 1250,  
        height : 500,
        padding: 10,
    },

    autocomp:{
        padding: 10,
    },
    
    shadow:{
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
    },
    subsriptionlist:{        
        background: 'rgb(255, 255, 230)',  
        overflow: 'scroll',     
        height : 1000,
    },
    
    clientPaper:{
        width : 1200,

    }

  });



  const basicClient = {name:'',
                    phone: '',
                    email: '',
                    comment: ''}

export default Clients
