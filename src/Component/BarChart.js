import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function Graph() {
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
    const width = 600;
    const height = 400;

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d, i) => i.toString()))
      .padding(0.3)
      .paddingOuter(-10);

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data)]);

    // svg 요소 생성
    const svg = d3
      .select(chartRef.current)
      .html("") // 기존 요소 삭제
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 150)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    //   .attr("transform", "translate(100, 500");

    // 막대그래프 생성
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(i.toString()))
      .attr("y", (d) => y(d))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d));

    // x 축 생성
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => labelTexts[i] + i))
      .selectAll("text")
      .style("text-anchor", "large")
      .attr("transform", "translate(0, 50) rotate(-90)");

    // y 축 생성
    svg.append("g").call(d3.axisLeft(y));
  }, []);

  return (
    <div className="BarChart">
      <div
        ref={chartRef}
        style={{ width: "500px", height: "500px", overflowX: "scroll" }}
      ></div>
    </div>
  );
}
