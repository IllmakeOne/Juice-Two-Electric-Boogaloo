import {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { ListItemIcon, Typography } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createBrowserHistory } from "history";

import HomeIcon from '@material-ui/icons/Home'


import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

import logo from "../../assets/logo.png"

import { Route, Link, BrowserRouter as Router } from "react-router-dom"
import MainBar from './../bar/MainBar'
import MainRec from './../rec/MainRec'
import StartScreen from './../StartScreen'
import Bill from './../Bill'
import MainSche from './../rec/schedules/MainSche'
import RestockPrinter from '../printers/RestockPrinter'
import AddProfile from '../rec/clients/AddProfile'
import Clients from '../resources/Clients'
import Scanner from '../rec/mainpage/Scanner'

import MaineRecScreen from '../rec/mainpage/MaineRecScreen'
import DisplaySubs from '../rec/pieces/DisplaySubs'

import { MyContext } from '../../App'
import RestockMain from '../resources/RestockMain'
import NewItem from '../resources/restocking/NewItem'
import AddSupplier from '../resources/restocking/AddSupplier'
import AddStock from '../resources/restocking/AddStock'
import PaymentBox from '../payment/PaymentBox';





const history = createBrowserHistory();
export default function MyDrawer(){
  const classes = drawerStyles();

  const cx = useContext(MyContext) //cx for context
  
  const [stockOpen, setStockOpen] = useState(false)
  const openStockmenu = () =>{
    setStockOpen(!stockOpen)
  }

    return(
    <Router history={history}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
      
     <div className={classes.logoDivStyle}>      
           <img src={logo} alt="Logo" className={classes.logoStyle} />
        </div> 

        <Divider classes={{root: classes.divider}}/>
        <List>

        <ListItem
            button
            component={Link}
            to="/"
          >
            <ListItemIcon style={{color:"white"}}><HomeIcon></HomeIcon></ListItemIcon>

             <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Home':'Acasa'}</Typography>}
             />
          </ListItem>
        
          <ListItem
            button
            component={Link}
            to="/bar"
          >
            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Bar</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/rec"
          >
            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Reception':'Receptie'}</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/mainrec"
          >
            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Scanning Screen':'Ecran Scanare'}</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/sche">

            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Schedule':'Orar'}</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/addinv">

            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Restock':'Aprovizionare'}</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/addprof">

            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Resources':'Resurse'}</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/bill">

            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Bill':'Bon'}</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/clients">

            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Clients':'Clienti'}</Typography>}
             />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/test">

            <ListItemText
               disableTypography
               primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'? 'Testing':'Testare'}</Typography>}
             />
          </ListItem>

          

          <ListItem button onClick={openStockmenu}>
            <ListItemText primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{cx.lg=='en'?'Products and suppliers':'Produse si inventar'}</Typography>}/>
              {stockOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={stockOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
              <ListItem 
                button
                component={Link}
                to="/newProduct">
                <ListItemText
                  disableTypography
                  primary={<Typography type="body2" style={{ color: '#FFFFFF' }}><h4>{cx.lg=='en'? 'Add new product':'Adauga produs nou'}</h4></Typography>}
                  />
              </ListItem>

              <ListItem 
                button
                component={Link}
                to="/newSupplier">
                <ListItemText
                  disableTypography
                  primary={<Typography type="body2" style={{ color: '#FFFFFF' }}><h4>{cx.lg=='en'? 'Add new supplier':'Adauga aprov. nou'}</h4></Typography>}
                  />
              </ListItem>

              <ListItem 
                button
                component={Link}
                to="/addStock">
                <ListItemText
                  disableTypography
                  primary={<Typography type="body2" style={{ color: '#FFFFFF' }}><h4>{cx.lg=='en'? 'Restock':'Aprovizionare'}</h4></Typography>}
                  />
              </ListItem>
            </List>
          </Collapse>

        </List>
        
        </Drawer>
        <Route exact path="/" component={StartScreen} />
        <Route exact path="/bar" component={MainBar} />
        <Route path="/rec" component={MainRec} />   
        <Route path="/mainrec" component={MaineRecScreen} />  
        <Route path='/sche' component={MainSche} />  
        <Route path='/rest' component={RestockPrinter} />  
        <Route path='/addinv' component={RestockMain} />  
        <Route path='/addprof' component={AddProfile} /> 
        <Route path='/bill' component={Bill} /> 
        <Route path='/clients' component={Clients} /> 
        <Route path='/test' component={PaymentBox} /> 

        

        <Route path='/newProduct' component={NewItem} /> 
        <Route path='/newSupplier' component={AddSupplier} /> 
        <Route path='/addStock' component={AddStock} /> 
        

    </Router>
    )
}


const drawerWidth = 200;

const drawerStyles = makeStyles((theme) => ({
  sideBarEntry:{
    color:"white",
  },

  divider: {
    // Theme Color, or use css color in quote
    background: 'white',
   },

  logoStyle: {
    crop: "fill",
    width: "83%",
    pointerEvents: "all",
},

logoDivStyle: {
  justifyContent: "center",
  alignItems: "center",
},




  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    background:"#1565c0",
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
 
  inputRoot: {
    color: 'inherit',
  },


}));