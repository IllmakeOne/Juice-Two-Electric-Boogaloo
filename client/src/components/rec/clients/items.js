import {    List, 
    Datagrid, 
    Edit, 
    Create, 
    SimpleForm, 
    DateField, 
    TextField, 
    EditButton, 
    Filter,
    TextInput, 
    Show, 
    SimpleShowLayout,
     RichTextField,
    DateInput, 
    SearchInput} from 'react-admin'
import { Button } from '@material-ui/core';
import { BiDrink } from "react-icons/bi"
import { FiPlusSquare } from "react-icons/fi"
export const ItemIcon = BiDrink;



const PostTitle = ({ record }) => {
return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const AddItem = (props) =>{
return (
<Edit title={<PostTitle />} {...props}>
<SimpleForm>
    <TextInput disabled source="id" />
    <TextInput source="name" />
    <TextInput source="phone" />
    <TextInput source="email" />
    <TextInput label="Current Subscription" source="crtsub" />
    <TextInput source="comment" />
    {/* <DateInput label="Publication date" source="published_at" /> */}
    {/* <TextInput source="average_note" /> */}
</SimpleForm>
</Edit>
)
}

export const ItemShow = (props) => (
<Show {...props} show=''>
<SimpleShowLayout>
    <TextField label="Current Subscription Type "  source="crtsub.type" />
    <DateField label="End Date"  source="crtsub.end" />
    <TextField source="comment" />
</SimpleShowLayout>
</Show>
)

export const ItemEdit = (props) => (
<Edit title={<PostTitle />} {...props}>
<SimpleForm>
    <TextInput source="id" />
    <TextInput required source="name" />
    <TextInput required source="type" />
    <TextInput source="stock" />
    <TextInput required source="price" />
</SimpleForm>
</Edit>
)

export const ItemCreate = (props) => (
<Create title="Create an Item" {...props}>
<SimpleForm>
    <TextInput source="id" />
    <TextInput required source="name" />
    <TextInput required source="type" />
    <TextInput source="stock" />
    <TextInput required source="price" />
</SimpleForm>
</Create>
)

export const ItemList = (props) => (
<List {...props} filters={<ItemFilter/>}>
<Datagrid expand={ItemShow}>
    <TextField source="id" />
    <TextField source="name" />
    <TextField source="type" />
    <TextField source="stock" />
    <TextField source="price" />
    <div><Button
        startIcon={<FiPlusSquare/>}
        >
    </Button></div>
</Datagrid>
</List>
)

export const ItemShowSpecific = (props) => (
<Show {...props} show=''>
<SimpleShowLayout>
    <TextField source="title" />
    <TextField source="teaser" />
    <TextField source="name" />
    <TextField source="phone" />
    <TextField source="email" />
    <TextField label="Current Subscription"  source="crtsub" />
    <TextField source="comment" />
    <RichTextField source="body" />
    <DateField label="Publication date" source="created_at" />
</SimpleShowLayout>
</Show>
)

const ItemFilter = (props) => (
<Filter {...props}>
<SearchInput  source="q" alwaysOn inputProps={{autocomplete: 'off'}} />
<TextInput label="Name" source="name" defaultValue='' inputProps={{autocomplete: 'off'}}/>
<TextInput label="Stock" source="stock" defaultValue='' inputProps={{autocomplete: 'off'}}/>
</Filter>
)

