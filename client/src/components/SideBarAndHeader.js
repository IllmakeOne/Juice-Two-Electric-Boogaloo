import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBar from './sidebar_and_header_components/MyAppBar'
import MyDrawer from './sidebar_and_header_components/MyDrawer'

export default function PermanentDrawerLeft({changeGlobal}) {
  return (
    <div style={{display:"flex"}}>
      <CssBaseline />
      <MyAppBar changeGlobal={changeGlobal}></MyAppBar>
      <MyDrawer></MyDrawer>
    </div>
  );
}


