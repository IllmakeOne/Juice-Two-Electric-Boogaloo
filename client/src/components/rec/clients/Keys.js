import React, { useState, useEffect } from 'react'
import { fetchKeys } from '../../DBconn'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GridWrap, GridRow, GridColumn } from 'emotion-flex-grid'
import { pink, lightBlue} from '@material-ui/core/colors';
import { FiKey } from 'react-icons/fi'

import { switchKeyAssignment } from '../../DBconn'
import { Paper } from '@material-ui/core';


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

    
    orangeShadow: {
        boxShadow: '7px 9px 19px -1px rgb(255, 173, 51)',
    }
  });

function Keys() {

    const C = useStyles();
    const [keys, setKeys] = useState([])

    
    const getKeys = async() => {
        var serverKeys = await fetchKeys()
        setKeys(serverKeys)
        // console.log(serverKeys)
    }

    useEffect(()=>{
        getKeys()
    },[])

    // useEffect(()=>{
    //     console.log(keys)
    // },[keys])

    const createButton = (key) => {
        return(
            <div key = {key.id} className={key.assigned? 'assigned':'unassigned'} onClick={()=>Switch(key)}>
                <h3>{key.id} </h3><br/>
                    <FiKey size={20}/>
            </div>
        )
    }

    const getSlice = () => {
        var ret = []
        keys.map((key,index) => {
                ret.push(
                <GridColumn p={['m', 'm']}  >
                    {createButton(key)}
                 </GridColumn>)

        })
        return ret
    }
    
    const Switch = async (key) => {
        console.log(key)
        const newKey = await switchKeyAssignment(key)
        console.log(newKey)
        var aux = keys.map(el => {
            if( el.id == newKey.id)
                return newKey
            else 
                return el
        })
        console.log(aux)
        setKeys(aux)
    }

    return (
        <Paper className={C.orangeShadow}>
            <h1>Kyes</h1>
            <div >
                <GridRow wrap='wrap'justify='around' >
                    {keys? getSlice():null}
                </GridRow>
            </div>
        </Paper>
    )
}

export default Keys
