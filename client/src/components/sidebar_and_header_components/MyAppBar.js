import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';


import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { Route, Link, BrowserRouter as Router } from "react-router-dom"

import { MyContext } from '../../App'


import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'

import MainBar from './../bar/MainBar'
import MainRec from './../rec/MainRec'
import StartScreen from './../StartScreen'
import Bill from './../Bill'
import MainSche from './../rec/schedules/MainSche'
import RestockPrinter from '../printers/RestockPrinter'
import AddProfile from '../rec/clients/AddProfile'
import Clients from '../resources/Clients'
import Scanner from '../rec/mainpage/Scanner' 


export default function MyAppBar({changeGlobal}){
    const classes = appBarStyles()
    return(
      <AppBar position="fixed" className={classes.appBar}>
      <MyToolBar changeGlobal={changeGlobal}></MyToolBar>
      </AppBar>
    )
  }
  

  function MyToolBar({changeGlobal}){
    const classes = appBarStyles()

    const cx = useContext(MyContext)

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleCloseButton = (language) => {
      changeGlobal({lg: language})
      setAnchorEl(null)
    }

    
    const handleClose = () => {
      setAnchorEl(null)
    }
      return (
        <Toolbar>
        <div className={classes.grow} />
        {/* <List>

        <ListItem
            button
            component={Link}
            to="/"
          >
            <ListItemIcon style={{color:"white"}}></ListItemIcon>

             <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Home':'Acasa'}</Typography>}
             />
          </ListItem>
          </List> */}

        <div className={classes.sectionDesktop}>

          <Button aria-controls="simple-menu" aria-haspopup="true" 
                className={classes.menubutton} onClick={handleClick}>
              {cx.lg=='en'? 'Schimba Limba':'Change Language'}
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem  onClick={()=>handleCloseButton('en')}>English</MenuItem>
            <MenuItem  onClick={()=>handleCloseButton('ro')}>Romanian</MenuItem>            
          </Menu> 
        </div>

  

      </Toolbar>
      )
  }


  const drawerWidth = 200
  const appBarStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 100,
      
    },
  
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },

    appBar: {
        borderLeft: "1px solid white",
        background:"#1565c0",
        width: `calc(100% - ${drawerWidth}px)`,
        height:  '4.5%' ,
        marginLeft: drawerWidth,
      },

      menubutton:{
      background: 'lightblue'

    }
  
  }));