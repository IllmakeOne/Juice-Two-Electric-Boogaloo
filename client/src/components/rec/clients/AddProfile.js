
import { List, Datagrid, TextField, DateField, BooleanField, Admin, Resource, Button } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server'
import { ClientsList, ClientEdit, ClientCreate, ClientIcon } from './clients'
import { SubsList, SubsEdit, SubsCreate, SubsIcon } from './subscriptions'
import { ItemList, ItemEdit, ItemCreate, ItemIcon } from './items'
import simpleRestProvider from 'ra-data-simple-rest'
// import { Button } from '@material-ui/core'


import Modal from '@material-ui/core/Modal'
import Card from '@material-ui/core/Card'
import React, { useState } from 'react'



export const nope = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <TextField source="category" />
            <BooleanField source="commentable" />
        </Datagrid>
    </List>
)



const dataProvider = jsonServerProvider('http://localhost:3001')

const trye = () =>{
dataProvider
    .getOne('clients', { id: 1 })
    .then(response => {
        console.log(response.data); // { id: 123, title: "hello, world" }
    });
}

const AddProfile = () => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        console.log('dav')
        setOpen(true)
    }


    return (
        <div>
            <Admin dataProvider ={dataProvider}>
                <Resource name="clients" opendialog={handleOpen} list={ClientsList} edit={ClientEdit} create={ClientCreate} icon={ClientIcon}/>
                <Resource name="subs" list={SubsList} edit={SubsEdit} create={SubsCreate} icon={SubsIcon}/>
                <Resource name="prods" list={ItemList} edit={ItemEdit} create={ItemCreate} icon={ItemIcon}/>
            </Admin>

            
            <div>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <div>aaaa</div>
            </Modal>
            </div> 
        </div>
    )
}

export default AddProfile
