
import { GridColumn, GridRow } from 'emotion-flex-grid'
import { useState, useEffect, useContext} from 'react'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

import { getappsClients } from '../../../DBconn'
import TextField from '@material-ui/core/TextField'


const defaultClient = {name: ' ', phone: ' '}

function PickClinetandNr( upClient, newClient) {

    const [clients, setClients] = useState([])
    useEffect(()=>{
        const getClient = async ()=>{
            const serverClts = getappsClients()
            setClients(serverClts)
        }
        getClient()
    },[])

    const [predictor, setPredictor] = useState(defaultClient)

    const addnew = () =>{
        return(
        <GridRow>
            <GridColumn p='m' align='center' width={6}>
                <Autocomplete
                    value={predictor}
                    onChange={(event, newValue) => {
                    if ( newValue == null) {
                        console.log('I   ' + JSON.stringify(newValue))
                        // setPredictor(defaultClient)
                    } else if (newValue && newValue.inputValue) {
                        console.log('I I    ' + JSON.stringify(newValue))
                        // setPredictor({...predictor, name: newValue})
                    } else {
                        console.log('I I I   ' + JSON.stringify(newValue))
                        // setPredictor(newValue)
                    }
                    }}

                    
                    options={clients}
                    getOptionLabel={(option) => {
                            return option.name
                        }}

                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(option) => option.name + ' ' + option.phone }
                    style={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                    <TextField {...params} label="Select Type" variant="outlined" />
                    )}
                />
            </GridColumn>
            <GridColumn p='m' align='center' width={6}>

                aad
            </GridColumn>
        </GridRow>
        )
    }

    const autcompl = () =>{
        return(
        <GridRow>
            <GridColumn p='m' align='center' width={5}>

                aa
            </GridColumn>
            <GridColumn p='m' align='center' width={5}>

                aad
            </GridColumn>
        </GridRow>
        )
        
    }

    const returner = () =>{
        if(newClient == false){
            return autcompl()
        } else {
            return addnew()
        }
    }
    return (
        <div>
            {returner()}
        </div>
    )
}

export default PickClinetandNr
