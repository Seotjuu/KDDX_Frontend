import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import {randomData, randomText} from "../Module/GraphFunc.js";

// 범례 추가
import Legend from "../Graph/Legend.js"

export default function BarChartVer2() {
  const chartRef = useRef(null);

  useEffect(() => {
    BarChartVer2();      
  }, []);

  // 데이터 생성
  const labelTexts = randomText();
  const value1 = { data : randomData(), color : "skyblue" }
  const value2 = { data : randomData(), color : "yellow" }
  const value3 = { data : randomData(), color : "yellowgreen" }

  // 데이터 배열 형태로 묶어주기 
  const MaxData = [d3.max(value1.data), d3.max(value2.data), d3.max(value3.data)]

  // 범례 데이터
  const AllData = [
    {
      name : "1차",   // 막대 이름
      color : "skyblue" // 막대 색깔
    },

    {
    name : "2차",
    color : "yellow"
    },

    {
    name : "3차",
    color : "yellowgreen"
    }

  ]

  const BarChartVer2 = () => {
    // x, y 축 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };  // margin 설정
    const width = 1000; // 넓이 설정
    const height = 300; // 높이 설정

    const x = d3
      .scaleBand() // x축
      .range([0, width + 200]) // 범위
      .domain(labelTexts.map((d, i) => i.toString())) // x축 
      .padding(0.8);  // 그래프 두께

    const y = d3
      .scaleLinear() // y축
      .range([height, 0]) //
      .domain([0, d3.max(MaxData)]); // y축의 범위

    // svg 요소 생성
    const svg = d3
      .select(chartRef.current)
      .html("") // 기존 요소 삭제
      .append("svg")  // svg 생성
      .attr("width", width + margin.left + margin.right + 200) // SVG 넓이 설정
      .attr("height", height + margin.top + margin.bottom + 200)  // SVG 높이 설정
      .append("g") // 그룹 생성
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 막대그래프 생성
    svg
      .append("g") // 그룹 생성
      .selectAll(".bar1")
      .data(value1.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", value1.color)
      .attr("x", (d, i) => x(i.toString())-35) // x 좌표
      .attr("y", (d) => y(d)) // y 좌표
      .attr("width", x.bandwidth()) // 막대그래프 너비
      .attr("height", (d) => height - y(d)); // 막대그래프 높이
    
      svg
      .append("g") // 그룹 생성
      .selectAll(".bar2")
      .data(value2.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", value2.color)
      .attr("x", (d, i) => x(i.toString())) // x 좌표
      .attr("y", (d) => y(d)) // y 좌표
      .attr("width", x.bandwidth()) // 막대그래프 너비
      .attr("height", (d) => height - y(d)); // 막대그래프 높이

      svg
      .append("g") // 그룹 생성
      .selectAll(".bar2")
      .data(value3.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", value3.color)
      .attr("x", (d, i) => x(i.toString())+35) // x 좌표
      .attr("y", (d) => y(d)) // y 좌표
      .attr("width", x.bandwidth()) // 막대그래프 너비
      .attr("height", (d) => height - y(d)); // 막대그래프 높이

    // x 축 생성
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`) // x 축 위치
      .call(d3.axisBottom(x).tickFormat((d, i) => labelTexts[i])) // x축 단위
      .selectAll("text")
      .style("text-anchor", "start")
      .attr("transform", "translate(13, 10) rotate(90)"); // x축 텍스트

    // y 축 생성
    svg.append("g").call(d3.axisLeft(y)); // y축 단위
  }

  return (
    <div className="BarChart" style={{ margin: "100px", textAlign: "center" }}>
      <div>
        <h3>Bar Chart ver.2</h3>
      </div>
      <div style={{  }}>
        <div
          ref={chartRef}
          style={{ width: "500px", height: "500px", overflowX: "scroll", display: "inline-block" }}
        ></div>

        <Legend value={AllData} />
      </div>
    </div>
  );
}
