import React from 'react';
import BasicTable from './components/BasicTable';
import { green } from '@mui/material/colors';

const App = () => {
  return (
    <div>
      <h1 style={{display: "flex" , justifyContent: "center", marginTop: "5px", color: "maroon"}}> React Table </h1>
     <BasicTable />
    </div>
  )
}

export default App;