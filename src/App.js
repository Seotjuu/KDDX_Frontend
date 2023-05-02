import './App.css';
import React from 'react';

// import Component
import ProTable from './Component/ProTable';
import Title from './Component/Title';
import ButtonEvent from './Component/ButtonEvent';
import Graph from './Component/Graph';

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

        <Graph />
      </div>
    </div>
  );
}


