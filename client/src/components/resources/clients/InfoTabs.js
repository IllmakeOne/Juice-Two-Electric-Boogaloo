import {useState, useEffect} from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'
import { Button, Input, TextField } from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles'

import SubHBox from './SubHBox'
import CliententryHTable from '../../rec/pieces/CliententryHTable';
import EditData from './EditData';




function InfoTabs({subH, entryH, client}) {
  
    const C = useStyles()

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return (
        <div>
            <AppBar position="static" >
                <Tabs value={value} onChange={handleChange} className= {C.clientInfoTabs}>
                    <Tab className={C.tab} label="Sub History" {...a11yProps(0)} />
                    <Tab className={C.tab} label="Entry History" {...a11yProps(1)} />
                    <Tab className={C.tab} label="Other" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            
            <TabPanel value={value} index={0}>
               <Paper style={{height: 650, overflow: 'auto'}}>
                  {/* <div className={`${classes.subsriptionH} ${classes.shadow}`} > */}
                      {subH.map( (el) =>(
                              <SubHBox sub = {el}/>
                      ))}
                  {/* </div> */}
                </Paper>
            </TabPanel>


            <TabPanel value={value} index={1}>               
              <CliententryHTable H = {entryH} />
            </TabPanel>


            <TabPanel value={value} index={2}>
                <EditData client = {client} />
            </TabPanel>
        </div>
    )
}


const useStyles = makeStyles({
  tab: {
      fontWeight: 'bold',
  },
  clientInfoTabs: {
      fontWeight: 'bold',
      background:'#f6a269',
      color: '#0707a0',
  },

})



export default InfoTabs
