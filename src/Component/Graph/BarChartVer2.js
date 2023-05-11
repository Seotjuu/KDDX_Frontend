import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function BarChartVer2() {
  const chartRef = useRef(null);

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

  useEffect(() => {
      BarChartVer2();      
  }, []);

  const BarChartVer2 = () => {
    const data = randomData();

    const labelTexts = randomText();

    // x, y 축 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };  // margin 설정
    const width = 1500; // 넓이 설정
    const height = 300; // 높이 설정

    const x = d3
      .scaleBand() // x축
      .range([0, width + 200]) // 범위
      .domain(data.map((d, i) => i.toString())) // x축 
      .padding(0.1);  // 그래프 두께

    const y = d3
      .scaleLinear() // y축
      .range([height, 0]) //
      .domain([0, d3.max(data)]); // y축의 범위

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
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "skyblue")
      .attr("x", (d, i) => x(i.toString()))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d));

    // x 축 생성
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => labelTexts[i])) // x축 단위
      .selectAll("text")
      .style("text-anchor", "start")
      .attr("transform", "translate(12, 10) rotate(90)");

    
    // y 축 생성
    svg
      .append("g")
      .call(d3.axisLeft(y)); // y축 단위   
  }

  return (
    <div className="BarChart" style={{ margin: "100px" }}>
      <div>
        <h3>Bar Chart ver.2</h3>
      </div>
      <div
        ref={chartRef}
        style={{ width: "500px", height: "500px", overflowX: "scroll" }}
      ></div>
    </div>
  );
}
