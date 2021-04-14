import { useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';


import {  fetchCartProdLists } from '../../DBconn'
import { MyContext } from '../../../App';
import { Input } from '@material-ui/core';
import { GridColumn, GridRow } from 'emotion-flex-grid';

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });

const MyDialogue = ({ onClose, open, onSubmit, variant}) => {
    const classes = useStyles();
    const [prodLists, setProdLists] = useState([])
    const [crtList, setCrtList] = useState('')

    const cx = useContext(MyContext)
    const decLg = (en, ro) => {
      if(cx.lg=='en')
          return en
      else
          return ro
    }

    useEffect(() => {
        const anon = async ()=>{
            const serverLists = await fetchCartProdLists()
            setProdLists(serverLists)
            // console.log(serverLists)
        }
        anon()

    }, [])

  
    const handleClose = () => {
      onClose()
    }
  
    const handleListItemClick = (value) => {
      onSubmit(value)
    }

    const handleSaveListSubmit = () =>{
      if(crtList.lenght < 3){
        alert(decLg('Please provide a longer name', 'Introduceti va rog un nume mai lung'))
      } else {
        setCrtList('')
        onSubmit(crtList)
      }
    }

    const getDialogContent =() =>{
      if(variant == 'load'){
          return(
            <div>
            <DialogTitle>{decLg('Load a list','Incarca o lista')}</DialogTitle>
            <List>
              {prodLists.map((list) => (
                <ListItem button onClick={() => handleListItemClick(list.prods)} key={list.id}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={list.name} secondary={list.date}/>
                </ListItem>
              ))}
            </List>
            </div>
          )
      } else if(variant == 'save'){
          return(
            <div>
            <DialogTitle ><h6>{decLg('Save List','Salveaza Lista')}</h6></DialogTitle>
            <DialogContent style={{padding: 20}}>
              <GridRow>
                <GridColumn>
                  <h5>{decLg('Client name:', 'Nume client: ')}</h5>
                </GridColumn>
                <GridColumn>
                  <Input 
                    type='text'
                    value={crtList}
                    error={crtList.length < 2}
                    onChange={(e) => setCrtList(e.currentTarget.value)}
                  />
                </GridColumn>
              </GridRow>
            </DialogContent>
              <DialogActions>
                <Button style ={{textTransform: 'none', background:'rgb(255, 185, 150)'}}
                    color="secondary" variant="contained" 
                    onClick={handleClose} color="secondary" variant="contained"
                    >
                        <h3>
                            {decLg('Cancel', 'Anuleaza')}
                        </h3>
                </Button>
                <Button  style ={{textTransform: 'none', background: '#7cfc9a'}} 
                    color="primary" variant="outlined"  
                    onClick={handleSaveListSubmit}
                    >
                        <h3>
                            {decLg('Save', 'Salveaza')}
                        </h3>
                </Button>
            </DialogActions>
            </div>
          )
      }
    }
  
    return (
      <Dialog onClose={handleClose}  open={open} 
        fullWidth={true}
        maxWidth='xs'>
        {getDialogContent()}
      </Dialog>
    )
  
}

// SimpleDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     open: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
//   };

export default MyDialogue
