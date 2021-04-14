import { useState, useEffect } from 'react'
import { fetchClients } from '../../DBconn'

import Paper from '@material-ui/core/Paper'
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'

import { makeStyles } from '@material-ui/core/styles'

import { getSpecificClient } from '../../DBconn'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import DisplaySubs from '../pieces/DisplaySubs'
import SubHBox from '../../resources/clients/SubHBox'
import KeyBox from './pieces/KeyBox'
import IconButton from '@material-ui/core/IconButton'

import {AiOutlineCloseCircle} from 'react-icons/ai'


function ClientIn({client, crtkey,unFocus,resetClient}) {
    const C = useStyles()
    // let { url } = useRouteMatch()
    // let { clientId } = useParams()

    // const [client, setClient] = useState([])
    // const [crtClient, setCrtClient] = useState([])

    // useEffect(()=>{
    //     setClient(clientt)
    // },[])


    const detailsClient = () => {
        // console.log(client)
        if(client != 0){
            return (
                <GridRow  direction='column' wrap='wrap' >
                    <GridColumn p = 'm' width = {8}>
                        <GridRow>
                            <GridColumn width= {8}><h2>{client.name}</h2></GridColumn>
                            <GridColumn offset= {8}><h2>{client.key}</h2></GridColumn>
                        </GridRow>
                        <SubHBox sub = {client.crtsub}/>
                    </GridColumn>

                    <GridColumn width={4} p = 's'>
                        <KeyBox crtKey = {crtkey}/>
                    </GridColumn>
                </GridRow>

            )


        }  else {
            return (
                <GridRow  direction='row' wrap='wrap' >
                    <GridColumn width={4} p = 's'>
                        <KeyBox crtKey = {crtkey} />
                    </GridColumn>
                    <GridColumn width={8} p = 's'>
                        <h3>uncanned</h3>
                    </GridColumn>
                </GridRow>
            )
        }
    }


    return (
        <div>
            <div>
                <GridRow justify ='end'>
                    <GridColumn offset= {11}>
                        <IconButton onClick = {() => resetClient()}>
                            <AiOutlineCloseCircle/>
                        </IconButton>
                    </GridColumn>
                </GridRow>
                {detailsClient()}


            </div>

            
        </div>
    )
}

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },

    paper: {
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
        height: 400,
        width:  600,
        padding: 15,
    }

  }); 

export default ClientIn
