import { useState, useEffect} from 'react'

import Scanner from './Scanner'
import ClientIn from './ClientIn'

import loading from '../loading.gif'
import { makeStyles } from '@material-ui/core/styles'


import { getSpecificClient, getSpecificKey, unlockKey,switchKeyAssignment } from '../../DBconn'


import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory 
  } from "react-router-dom"
  
import { GridColumn, GridRow } from 'emotion-flex-grid'
import ScanHisotory from './pieces/ScanHisotory';
import UpcomingEvents from './pieces/UpcomingEvents';
import Paper from '@material-ui/core/Paper' 
// import { List } from '@material-ui/core'


const getClient = (id) => {
    const NameLess = async(id)=>{
        const aux = await getSpecificClient(id)
        // console.log(aux)
        return aux[0]
    }
    return NameLess(id)
}

const getKey = (id) => {
    const NameLess = async(id)=>{
        const aux = await getSpecificKey(id)
        console.log(aux)
        const auxx = await switchKeyAssignment(aux[0])
        console.log(auxx)
        return auxx 
    }
    return NameLess(id)
}

function MaineRecScreen() {
    const C = useStyles()

    const [scanHistory, setScanHistory] = useState([])

    const [client, setClient] = useState(0) 

    const [key, setKey] = useState({id:0})

    /**
     * this is the clients taht are currently in the building
     */
    const[inHouse, setInHouse] = useState([])



    const scannedSomething = (scanText) => {
        console.log(scanText)
        if(scanText.substr(0,2) == 'LK'){
            // console.log('key sncaed')
            //gets the key from the databse
            if(client.id == 0){

            } else {
            getKey(scanText.substr(2,2)).then(
                ret=>{
                    // console.log(ret) 
                    setKey(ret)
                })
            }
        } else if(scanText.substr(0,2) == 'CL') {
            // getClient(scanText.substr(scanText.length - 1)).then(
            // if(scanText == 'lmao')
            getClient(scanText.substr(2,3)).then(
                ret=>{
                    setClient(ret)
                    console.log(inHouse.push(ret))

                    // addToHistory(ret)
                })
        }
    }

   const addToHistory = (entry) =>{
        const aux = inHouse
        aux.push(entry)
        setInHouse(aux)
   }

    const unFocus = () => {
        setKey({id:0})
    }

    useEffect(()=>{
        const now = new Date
        if(client != 0)
            addToHistory({...client, timeofEntry: now})

    },[client])

    const resetClient = () => {
        getClient(0).then(
            ret=>{
                console.log(ret) 
                setClient(ret)
            })
    }

    return (
        <div>
            <br/>
            <br/>

            <GridRow>
                <GridColumn p='m' >
                    <Paper  elevation={3} className={C.paper}>
                        <Scanner upScanned={scannedSomething} 
                            image={loading} 
                            />
                    </Paper>
                </GridColumn>
                
                <GridColumn p='m' >
                    <Paper  elevation={3} className={C.paper}>
                        <ClientIn 
                            client = {client} 
                            crtkey={key} 
                            unFocus = {unFocus}
                            resetClient = {resetClient}
                            />
                    </Paper>
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn p='m' >
                    <Paper  elevation={3} className={C.paper}>
                        <ScanHisotory entries = {inHouse} />
                    </Paper>
                </GridColumn>
                
                <GridColumn p='m' >
                    <Paper  elevation={3} className={C.paper}>
                        <UpcomingEvents />
                    </Paper>
                </GridColumn>
            </GridRow>
            
            {/* <Keys/> */}
            {/* {ScreenPick()} */}

        </div>
    )
}

const useStyles = makeStyles({

    orangeShadow: {
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
    },

    scanner:{
        height: 400,
        width:  600,

    },

    
    paper: {
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
        height: 400,
        width:  600,
        padding: 15,
        height: 500, 
        overflow: 'auto',
    },

  }); 

export default MaineRecScreen



{/* <Router>
<Scanner upScanned={scannedSomething}/>
<Keys />
<br/><br/><br/>

<Switch>
    <Route path={`${path}/:clientId`}>
        
        <br/><br/><br/>
        <ClientIn />
    </Route>

    <Route path={`${path}/checkin/:clientId`}>
        <Redirect to="/checkin/:clientId" />
        <br/><br/><br/>
        <ClientIn />
    </Route>

    <Route path={path}>
        <Scanner upScanned={scannedSomething} image={Capture}/>
        <Keys />
        <Button onClick = {()=>scannedSomething('1')}>dab</Button>
    </Route>
</Switch>



<br/>
<br/>
<br/>
</Router> */}