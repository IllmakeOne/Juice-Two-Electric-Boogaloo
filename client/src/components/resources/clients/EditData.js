import {useState, useEffect} from 'react'

import {  GridRow, GridColumn } from 'emotion-flex-grid'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { FiSave } from 'react-icons/fi'


import { Autocomplete } from '@material-ui/lab'

import { updateClient } from '../../DBconn'


function EditData({ client }) {

    const [crtClient, setCrtClient] = useState()

    useEffect (()=>{
        setCrtClient(client)
    },[])

    const onSubmit = async () => {
        setCrtClient(updateClient(crtClient))
    }

    const handleCangeName = e => {
        setCrtClient({...crtClient, name: e.target.value})
    }
    const handleChangePhone = e => {
        setCrtClient({...crtClient, phone: e.target.value})
    }
    const handleChangeEmail = e => {
        setCrtClient({...crtClient, email: e.target.value})
    }
    const handleChangeComment = e => {
        setCrtClient({...crtClient, comment: e.target.value})
    }

    return (
        <div>
            <GridRow direction = 'column' align='center'>

                {/* <GridColumn textAlign={'center'}  p={['s', 's']}> 
                    <Autocomplete
                        className={''}
                            id="auto-clients"
                            options={clients}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            value={client}
                            selectOnFocus
                            clearOnBlur
                            // getOptionSelected={defaultValue}
                            handleHomeEndKeys
                            renderInput={(params) => <TextField {...params} label='Find Client' variant='outlined' />}
                            onChange={(ev, newVal)=>{
                                if(newVal) {setClient({name:newVal.name,
                                            phone: newVal.phone?newVal.phone:'',
                                            email: newVal.email?newVal.email:'',
                                            comment: newVal.comment?newVal.comment:''})
                                // setCrtItem(newVal)
                                console.log(newVal)}
                            }}
                    /> 
                </GridColumn> */}


                <GridColumn textAlign={'center'}  p={['s', 's']}> 
                    <FormControl >
                        <InputLabel htmlFor="component-simple">Name</InputLabel>
                        <Input  
                            name='nameInput'
                            type='text'
                            value={crtClient? crtClient.name: ''}
                            defaultValue={0} 
                            onChange={handleCangeName}
                        />
                    </FormControl>
                </GridColumn>

                <GridColumn p={['s', 's']}>
                    <FormControl >
                        <InputLabel htmlFor="component-simple">Phone Number</InputLabel>
                        <Input  
                            name='phoneInput'
                            type='text'
                            // placeholder={crtItem.stock}
                            value={crtClient? crtClient.phone: ''}
                            // error={crtClient.phone.lenght < 10}
                            defaultValue={0} 
                            onChange={handleChangePhone}
                        />
                    </FormControl>
                </GridColumn>

                <GridColumn p={['s', 's']}>
                    <FormControl >
                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Input  
                            name='emailInput'
                            type='text'
                            // placeholder={crtItem.stock}
                            value={crtClient? crtClient.email: ''}
                            // error={client.phone.lenght < 10}
                            defaultValue={0} 
                            onChange={handleChangeEmail}
                        />
                    </FormControl>
                </GridColumn>

                <GridColumn mt='xl' mb='xl' >
                    <FormControl >
                        <InputLabel htmlFor="component-simple">Comment</InputLabel>
                        <Input  
                            name='commentInput'
                            type='text'
                            placeholder={'comment'}
                            value={crtClient? crtClient.comment: ''}
                            // error={client.phone.lenght < 10}
                            // defaultValue={0} 
                            onChange={handleChangeComment}
                        />
                    </FormControl>
                </GridColumn>

                <GridColumn p={['s', 's']} align='center'>
                    <div className = 'saveClientButton'>
                        <Button  
                            // className='b.changeprice'
                            // variant="contained"
                            color="primary"
                            size='large'
                            startIcon={<FiSave />}
                            onClick ={()=>onSubmit()}
                            >
                                Save
                        </Button>
                    </div>
                </GridColumn>
            </GridRow>
        </div>
    )
}

export default EditData
