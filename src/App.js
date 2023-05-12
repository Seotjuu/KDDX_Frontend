import "./App.css";
import React from "react";

// import Component
import ProTable from "./Component/ProTable";
import Title from "./Component/Title";
import ButtonEvent from "./Component/ButtonEvent";
import LineChart from "./Component/ChartTest/LineChart";
import BarChart from "./Component/ChartTest/BarChart";
import LineChartVer2 from "./Component/ChartTest/LineChartVer2";
import BarChartVer2 from "./Component/ChartTest/BarChartVer2";
import Chart from "./Component/Graph/Chart";

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

          <Chart />
        </div>
      </div>
    </div>
  );
}
