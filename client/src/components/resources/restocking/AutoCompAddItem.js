import { useEffect, useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

import { MyContext } from '../../../App'


const filter = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.name,
});


// const filter = createFilterOptions();

export default function AutoCompAddItem({open, setOpen, types, upValue}) {

  const cx = useContext(MyContext)

  const [dialogValue, setDialogValue] = useState({
    name: '',
    vat: 1,
  });

  const handleClose = () => {
    setDialogValue({
      name: '',
      vat: 1,
    })
    
    setOpen(false)
  };


  const handleSubmit = (event) => {
    console.log('Handle submit called')
    event.preventDefault();
    

    upValue({
      name: dialogValue.name,
      vat: parseInt(dialogValue.vat, 10),
    })

    setOpen(false)
  };

  return (
    <div>
      <Autocomplete
        value={dialogValue}
        onChange={(event, newValue) => {
          if ( newValue == null) {
            // console.log('I   ' + JSON.stringify(newValue))
            setDialogValue({
              name: '',
              vat: 1,
            })
          } else if (newValue && newValue.inputValue) {
            // console.log('I I    ' + JSON.stringify(newValue))
            setOpen(true);
            setDialogValue({
              name: newValue.name,
              vat: 1,
            })
          } else {
            // console.log('I I I   ' + JSON.stringify(newValue))
            upValue(newValue)
            setDialogValue(newValue)
          }
        }}

        
        id="free-solo-dialog-demo"
        options={types}
        //--------------------------------------------------------Filter-----------
        filterOptions = {(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: params.inputValue,
            });
          }

          //  console.log(filtered)
          return filtered;
        }}
        //--------------------------------------------------------Filter ///-----------

        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          // console.log(option)
          // if (typeof option.name === 'string') {
          //   return option.name;
          // }
          // if (option.inputValue) {
          //   return option.inputValue;
          // }
          return option.name
        }}

        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name + '  vat: ' + option.vat + '%' }
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Select Type" variant="outlined" />
        )}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleClose}>
          <DialogTitle id="form-dialog-title">Add new product Type</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Alchool, Juices, Bars, etc
            </DialogContentText>
            <TextField
              autoComplete='off'
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              error={dialogValue.name.length < 3}
              onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
              label="Type name"
              type="text"
            />
            <TextField
              autoComplete='off'
              margin="dense"
              id="name"
              value={dialogValue.vat}
              error={dialogValue.vat < 0.1}
              onChange={(event) => setDialogValue({ ...dialogValue, vat: event.target.value })}
              label="TVA"
              type="number"
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
  );
}