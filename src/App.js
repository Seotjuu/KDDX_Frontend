import './App.css';
import React from 'react';

// import Component
import ProTable from './Component/ProTable';
import Title from './Component/Title';
import ButtonEvent from './Component/ButtonEvent';
import LineChart from './Component/LineChart';
import BarChart from './Component/BarChart';

// import CSS
import './Css/ProTable.css';
import './Css/ProductAddModal.css';

export default function App() {
  return (
    <div className="App" style={{padding: "50px"}}>
      <Title />  
      <div className="Content">
        <ButtonEvent />

        <ProTable/>

        <LineChart />
        <BarChart />
      </div>
    </div>
  );
}


