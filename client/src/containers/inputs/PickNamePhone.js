import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { MyContext } from '../../App'
import { useEffect, useState, useContext } from 'react'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { getNameAndPhones } from '../../components/DBconn'

const filter = createFilterOptions({
    // matchFrom: 'start',
    stringify: option => option.phone + option.name,
  });

const PickNamePhone=({setNamePhone}) => {   
    const cx = useContext(MyContext)

    const [phones, setPhones] = useState([])
    const [crtPhone, setCrtPhone] = useState(emptyPhone)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        const getPhones = async ()=>{
            const serverPhones = await getNameAndPhones()
            setPhones(serverPhones)
        }
        getPhones()
    },[])

    const setName = (newName) =>{
        setCrtPhone(newName)
        console.log(newName)
        setNamePhone(newName)
    }

    
  const handleSubmit = (event) => {
    // console.log('Handle submit called')
    event.preventDefault()
    setNamePhone(crtPhone)
    setOpen(false)
  }

  const handleClose = () => {
    // setCrtPhone({
    //   name: '',
    //   phone: '',
    // })
    
    setOpen(false)
  };

    return (
        <div>
            <Autocomplete
                value={crtPhone}
                onChange={(event, newValue) => {
                    if ( newValue == null) {
                        console.log('I   ' + JSON.stringify(newValue))
                        setName(emptyPhone)
                    } else if (newValue && newValue.inputValue) {
                        console.log('I I    ' + JSON.stringify(newValue))
                        setOpen(true)
                        
                    } else {
                        console.log('I I I   ' + JSON.stringify(newValue))
                        setName(newValue)
                    }
                }}

                options={phones}
                //--------------------------------------------------------Filter-----------
                filterOptions = {(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue !== '') {
                        filtered.push({
                        inputValue: params.inputValue,
                        name: params.inputValue,
                        });
                    }
                     console.log(filtered)
                    return filtered;
                }}
                //--------------------------------------------------------Filter ///-----------

                getOptionLabel={(option) => {
                    return  option.name
                }}

                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(option) => option.name + ' phone: ' + option.phone}
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                <TextField {...params} label={cx.lg=='en'?'Name':'Nume'} variant="outlined" />
                )}
            />
            
            {/* <TextField label={cx.lg=='en'?'Phone Number':'Numar Telefons'} variant="outlined">{crtPhone.phone}</TextField> */}
            <br/><h3>{crtPhone.phone}</h3>

            
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleClose}>
                <DialogTitle >{cx.lg=='en'?'Add new Number':'Adauga nr. nou'}</DialogTitle>
                <DialogContent>
                    <TextField
                        style={{margin:10}}
                        autoComplete='off'
                        autoFocus
                        margin="dense"
                        value={crtPhone.name}
                        error={crtPhone.name.length < 3}
                        onChange={(event) =>
                            setCrtPhone({ ...crtPhone, name: event.target.value })}
                        label={cx.lg=='en'?'Name':'Nume'}
                        type="text"
                    />
                    <TextField
                        style={{margin:10}}

                        autoComplete='off'
                        margin="dense"
                        value={crtPhone.phone}
                        error={crtPhone.phone.length < 10}
                        onChange={(event) => 
                            setCrtPhone({ ...crtPhone, phone: event.target.value })}
                        label={cx.lg=='en'?'Phone number':'Numar Telefon'}
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {cx.lg =='en'? 'Cancel':'Anuleaza'}
                    </Button>
                    <Button type="submit" color="primary" onClick={handleSubmit}>
                        {cx.lg =='en'? 'Add':'Adauga'}
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

const emptyPhone= {name: '', phone: ''}

export default PickNamePhone
