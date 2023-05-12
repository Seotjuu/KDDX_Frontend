import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import Legend from "../Graph/Legend";

export default function LineChartVer2() {
  const chartRef = useRef(null);

  // 랜덤 숫자 50개 생성
  const randomData = () =>{
      const data = Array.from({ length: 50 }, () =>
        Math.floor(Math.random() * 100)
      );

      return data;
  }

  const randomText = () => {
    const labelText =
    Array.from({ length: 50 }, () => {
      let text = "";
      for (let i = 0; i < 30; i++) {
        // 글자 수
        text += String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
      return text;
    });

    return labelText;
  }

  
  // 범례 데이터
  const AllData = [
    {
      data: randomData(),
      name : "dataA",
      color : "red"
    },

    {
    data: randomData(),
    name : "dataB",
    color : "orange"
    },

    {
    data: randomData(),
    name : "dataC",
    color : "yellow"
    },

    {
    data: randomData(),
    name : "dataD",
    color : "green"
    },

    {
    data: randomData(),
    name : "dataE",
    color : "blue"
    },

    {
    data: randomData(),
    name : "dataF",
    color : "pink"
    }
  ]

  const MaxData = AllData.map((arr, idx)=>{
    return d3.max(arr.data);
  })

  useEffect(() => {
    LineChart();
  }, []);

  const LineChart = () => {
    const labelTexts = randomText();

    // x, y 축 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1500;
    const height = 300;

    const x = d3
      .scaleLinear()
      .range([0, width+200])
      .domain([0, 50]);
    
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(MaxData)]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveLinear);

    // 표식 설정
    const symbol = d3
      .symbol()
      .type(d3.symbolCircle)
      .size(70);

    // svg 요소 생성
    const svg = d3
      .select(chartRef.current)
      .html("") // 기존 요소 삭제
      .append("svg")
      .attr("width", width + margin.left + margin.right + 200)
      .attr("height", height + margin.top + margin.bottom + 200)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 선 그래프 생성
    const GraphLine = (data, color) => {
      svg
      .append("g")
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 3)
      .attr("d", line);

      // 표식 생성
      svg
      .append("g")
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "dot")
      .attr("transform", (d, i) => `translate(${x(i)},${y(d)})`)
      .attr("d", symbol)
      .attr("stroke", "white")
      .attr("stroke-width", 2);
    };

    AllData.map((val, idx)=>{
      GraphLine(val.data, val.color);
    })

    // x 축 생성
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => labelTexts[i]).ticks(50)) // x축 단위
      .selectAll("text")
      .style("text-anchor", "start")
      .attr("transform", "translate(13, 10) rotate(90)");

    // y 축 생성
    svg.append("g").call(d3.axisLeft(y));      

  };

  return (
    <div className="LineChart" style={{ margin: "100px" }}>
      <div>
        <h3>Line Chart ver.2</h3>
      </div>
      <div
        ref={chartRef}
        style={{ width: "500px", height: "500px", overflowX: "scroll" }}
      ></div>

      <Legend value={AllData}/>
    </div>
  );
}
