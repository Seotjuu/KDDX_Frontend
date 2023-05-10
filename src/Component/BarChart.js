import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function BarChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    // 랜덤 숫자 50개 생성
    const data = Array.from({ length: 50 }, () =>
      Math.floor(Math.random() * 100)
    );

    const labelTexts = Array.from({ length: 50 }, () => {
      let text = "";
      for (let i = 0; i < 30; i++) {
        // 글자 수
        text += String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
      return text;
    });

    // x, y 축 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1000;
    const height = 500;

    const x = d3
      .scaleBand() // x축
      .range([0, width + 200])
      .domain(data.map((d, i) => i.toString()))
      .padding(0.1);

    const y = d3
      .scaleLinear() // y축
      .range([height, 0]) //
      .domain([0, 100]); // y축의 범위

    // svg 요소 생성
    const svg = d3
      .select(chartRef.current)
      .html("") // 기존 요소 삭제
      .append("svg")
      .attr("width", width + margin.left + margin.right + 400)
      .attr("height", height + margin.top + margin.bottom + 200)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 막대그래프 생성
    svg
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

    svg // Label 추가 진행중
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => x(i.toString()))
      .attr("y", (d) => y(d))
      .attr("font-size", "11px")
      .attr("fill", "black")
      .attr("text-anchor", "middle");

    // x 축 생성
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => labelTexts[i])) // x축 단위
      .selectAll("text")
      .style("text-anchor", "large")
      .attr("transform", "translate(12, 120) rotate(90)");

    // y 축 생성
    svg.append("g").call(d3.axisLeft(y)); // y축 단위
  }, []);

  return (
    <div className="BarChart" style={{ margin: "100px" }}>
      <div>
        <h3>Bar Chart</h3>
      </div>
      <div
        ref={chartRef}
        style={{ width: "800px", height: "700px", overflowX: "scroll" }}
      ></div>
    </div>
  );
}
