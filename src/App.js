import "./App.css";
import React from "react";

// import Component
import ProTable from "./Component/ProTable";
import Title from "./Component/Title";
import ButtonEvent from "./Component/ButtonEvent";
import LineChart from "./Component/Graph/LineChart";
import BarChart from "./Component/Graph/BarChart";
import LineChartVer2 from "./Component/Graph/LineChartVer2";
import BarChartVer2 from "./Component/Graph/BarChartVer2";

// import CSS
import "./Css/ProTable.css";
import "./Css/ProductAddModal.css";

export default function App() {
  return (
    <div className="App" style={{ padding: "50px" }}>
      <Title />
      <div className="Content">
        <ButtonEvent />

        <ProTable />
        <div style={{display: "flex", flexWrap: "wrap" }}>
          <LineChart />
          <BarChart />
          <LineChartVer2 />
          <BarChartVer2 />
        </div>
      </div>
    </div>
  );
}
