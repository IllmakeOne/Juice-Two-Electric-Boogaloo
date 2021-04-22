import { GridColumn, GridRow } from 'emotion-flex-grid'
import { useState, useEffect, useContext } from 'react'
import { addOneSupplier, getSuppliers, putOneSupplier, deleteSupplier} from '../../DBconn'
import  { 
    DataGrid,
    ColDef,
    ValueGetterParams,
    CellParams,
    GridApi } from '@material-ui/data-grid'
import  Button from '@material-ui/core/Button'
import  IconButton from '@material-ui/core/IconButton'
import { FiEdit, FiSave, FiTrash } from 'react-icons/fi'
import { MyContext } from '../../../App'
import TextBox from './TextBox'

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import OrangePaper from '../../../containers/papers/OrangePaper'


const emptySup = {id: 0, name: '', cui: '', orc: '', address: '',bank: '', iban: '', bkaddr: ''}

const  AddSupplier = () => {
    const cx = useContext(MyContext) //cx for context
    const declg = (en, ro) =>{
        return cx.lg=='en'?en:ro
    }

    const [supps, setSupps] = useState([])
    const [sup, setSup] = useState(emptySup)
    
    const getSupps = async () => {
        const serverSups = await getSuppliers()
        console.log(serverSups)
        setSupps(serverSups)
    }

    const delteSupp = ()=>{

    }

    const sendToEdit = (id)=>{
        console.log(supps.filter(el=>el.id == id)[0])
        setEditSup(supps.filter(el=>el.id == id)[0])
    }

    useEffect(() => {
        getSupps()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if(sup.name == ''){
            alert(declg('Add prod name please', 'Adaugati Numeele aprovizionatorului '))
            return 
        } else if (sup.cui == ''){
            alert(declg('Add prod CUI please','Adaugati CUI'))
            return 
        } else if (sup.orc == ''){
            alert(declg('Add prod ORC please','Adaugati ORC'))
            return 
        }else if (sup.address == ''){
            alert(declg('Add an Firm Adress please','Adaugati adresa aprovizionatorului'))
            return 
        }else if (sup.bank == ''){
            alert(declg('Add a Bank name please', 'Adaugati nume banca'))
            return 
        }else if (sup.iban == ''){
            alert(declg('Add correct IBAN please','Adaugati IBAN banca'))
            return 
        }else if (sup.bkaddr == ''){
            alert(declg('Add correct bank address please','Adaugati adressa bancii'))
            return 
        }

        addOneSupplier(sup)
        getSupps()
        setSup(emptySup)
        
    }
        //furnizor
        
const columns = [
    {   
        field: '.',
        headerName: '',
        width: 50,
        renderCell: (params: CellParams) => {
            const onClick = () => {
                const api: GridApi = params.api
                const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c)
                    const thisRow = params.getValue('id') 
                    sendToEdit(thisRow)
                    
            //   fields.forEach((f) => {
            //     thisRow[f] = params.getValue(f)
            //   });
            }
            return <IconButton 
                        color= 'primary'
                        size='small'
                        onClick={onClick} >  
                            <FiEdit/>
                    </IconButton>
        }
    },
    {   
        field: '',
        headerName: ' ',
        width: 50,
        renderCell: (params: CellParams) => {
            const onClick = () => {
                const api: GridApi = params.api
                const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c)
                    const thisRow = params.getValue('id') 
                    deleteSupplier(thisRow)
                    getSupps()
            }
            return <IconButton 
                        color= 'secondary'
                        size='small'
                        onClick={onClick} >
                            <FiTrash/>
                    </IconButton>
        }
    },
    { field: 'name', headerName: declg('Name', 'Nume'), width: 130 },
    { field: 'address', headerName: 'Adress', width: 130 },
    { field: 'cui', headerName: 'CUI', width: 80 },
    { field: 'orc', headerName: 'ORC', width: 80 },
    { field: 'bank', headerName: 'Bank', width: 130 },
    { field: 'iban', headerName: 'IBAN', width: 130 },
    { field: 'bkaddr', headerName: 'Nank Address', width: 130 },
    ]
    


    const [editSup, setEditSup] = useState(emptySup)

    const updateSupplier = () => {
        if(editSup.name == ''){
            alert(declg('Add prod name please', 'Adaugati Numeele aprovizionatorului '))
            return 
        } else if (editSup.cui == ''){
            alert(declg('Add prod CUI please','Adaugati CUI'))
            return 
        } else if (editSup.orc == ''){
            alert(declg('Add prod ORC please','Adaugati ORC'))
            return 
        }else if (editSup.address == ''){
            alert(declg('Add an Firm Adress please','Adaugati adresa aprovizionatorului'))
            return 
        }else if (editSup.bank == ''){
            alert(declg('Add a Bank name please', 'Adaugati nume banca'))
            return 
        }else if (editSup.iban == ''){
            alert(declg('Add correct IBAN please','Adaugati IBAN banca'))
            return 
        }else if (editSup.bkaddr == ''){
            alert(declg('Add correct bank address please','Adaugati adressa bancii'))
            return 
        }

        putOneSupplier(editSup)

        const auxsus = supps
        auxsus.map(el=>{
            if(el.id == editSup.id){
                console.log(el)
                console.log(editSup)
                el = editSup
                console.log(el)
            }})
        setSupps(auxsus)
        setEditSup(emptySup)
    }

    const editname = e =>{setEditSup({...editSup, name: e.target.value})}
    
        return (
    <div className= 'ScreenElement'>
        <GridRow>
            <OrangePaper width={1500}>

            </OrangePaper>
        </GridRow>
            <OrangePaper width={1500} >
        <GridRow > 
            <GridColumn m = 'l'>
                <form className='add-form-supplier' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label>{declg('Name','Nume')}</label>
                        <input
                        type='text'
                        placeholder='Add Supplier name'
                        value={sup.name}
                        onChange={(e) => setSup({...sup, name: e.target.value})}
                        />
                    </div>

                    <div className='form-control'>
                        <label>CUI</label>
                        <input
                        type='text'
                        placeholder='uniq CUI'
                        value={sup.cui}
                        onChange={(e) => setSup({...sup, cui: e.target.value})}
                        />
                    </div>

                    <div className='form-control'>
                        <label>ORC</label>
                        <input
                        type='text'
                        placeholder='lamo'
                        value={sup.orc}
                        onChange={(e) => setSup({...sup, orc: e.target.value})}
                        />
                    </div>
                    
                    <div className='form-control'>
                        <label>Address</label>
                        <input
                        type='text'
                        placeholder='downtown'
                        value={sup.address}
                        onChange={(e) => setSup({...sup, address: e.target.value})}
                        />
                    </div>
                    
                    <div className='form-control'>
                        <label>{declg('Bank Name','Nume Banca')}</label>
                        <input
                        type='text'
                        placeholder='ex: BRD'
                        value={sup.bank}
                        onChange={(e) => setSup({...sup, bank: e.target.value})}
                        />
                    </div>

                    <div className='form-control'>
                        <label>{declg('Bank IBAN','IBAN Banca')} </label>
                        <input
                        type='text'
                        placeholder='RO00BRD0123456'
                        value={sup.iban}
                        onChange={(e) => setSup({...sup, iban: e.target.value})}
                        />
                    </div>


                    <div className='form-control'>
                        <label>{declg('Bank Address','Adresa Banca')} </label>
                        <input
                        type='text'
                        placeholder='RO00BRD0123456'
                        value={sup.bkaddr}
                        onChange={(e) => setSup({...sup, bkaddr: e.target.value})}
                        />
                    </div>
            
                    <input type='submit' value='Save Product' className='btn btn-block' width = '50px' />
                </form>        
            </GridColumn>   

            <GridColumn width = {6} style ={{width: 800}} m = 'l'>
                <DataGrid rows={supps} columns={columns} pageSize={5} />
            </GridColumn>
            <GridColumn m = 'l'>
                <GridColumn m = 's'>
                    <FormControl>
                        <InputLabel htmlFor="component-simple">{declg('Supplier Name', 'Nume aprovizionator')}</InputLabel>
                        <Input
                            type='text'
                            value={editSup.name}
                            onChange={editname}
                        />
                    </FormControl>
                </GridColumn>
                <GridColumn m = 's'>
                    <TextBox text ={editSup.cui}
                    label = {declg('Supplier CUI', 'CUI aprovizionator')} 
                    setText  = {n=> setEditSup({...editSup, cui: n})} 
                    />
                </GridColumn>
                <GridColumn m = 's'>
                    <TextBox text ={editSup.orc}
                        label = {declg('Supplier ORC', 'ORC aprovizionator')} 
                        setText  = {n=> setEditSup({...editSup, orc: n})} 
                        />
                </GridColumn>
                <GridColumn m = 's'>
                    <TextBox text ={editSup.address}
                    label = {declg('Supplier address', 'Adresa aprovizionator')} 
                    setText  = {n=> setEditSup({...editSup, address: n})} 
                    />
                </GridColumn>
                <GridColumn m = 's'>
                    <TextBox text ={editSup.bank}
                    label = {declg('Bank Name', 'Nume banca')} 
                    setText  = {n=> setEditSup({...editSup, bank: n})} 
                    />
                </GridColumn>
                <GridColumn m = 's'>
                    <TextBox text ={editSup.iban}
                        label = {declg('Bank IBAN', 'IBAN banca')} 
                        setText  = {n=> setEditSup({...editSup, iban: n})} 
                        />
                </GridColumn>
                <GridColumn m = 's'>
                    <TextBox text ={editSup.bkaddr}
                        label = {declg('Bank address', 'Adresa banca')} 
                        setText  = {n=> setEditSup({...editSup, bkaddr: n})} 
                        />
                </GridColumn>     
                <GridColumn m = 'xl'>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={updateSupplier}
                        endIcon={<FiSave/>}
                        >
                            {declg('Save Changes','Salveaza modificarile')}
                        </Button>
                </GridColumn> 

            </GridColumn>
    </GridRow>
            </OrangePaper>
    </div>
        )
}

export default AddSupplier
