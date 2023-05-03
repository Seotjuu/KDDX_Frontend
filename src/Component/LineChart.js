import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export default function Graph(){
  const chartRef = useRef(null);

  useEffect(() => {
    // 랜덤 숫자 50개 생성
    const data = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
    const labelTexts = Array.from({ length: 50 }, () => {
      const text = Array.from({ length: 10 }, () => {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
      });
      return text.join('');
    });

    // x, y 축 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600;
    const height = 400;

    const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, data.length]);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data)]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveLinear);

    // 표식 설정
    const symbol = d3.symbol()
      .type(d3.symbolCircle)
      .size(50);

    // svg 요소 생성
    const svg = d3.select(chartRef.current)
        .html("") // 기존 요소 삭제
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 선 그래프 생성
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // 표식 생성
    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "dot")
      .attr("transform", (d, i) => `translate(${x(i)},${y(d)})`)
      .attr("d", symbol);

    // x 축 생성
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => labelTexts[i]));

    // y 축 생성
    svg.append("g")
      .call(d3.axisLeft(y));
  }, []);

  return(
    <div className='LineChart' >
      <div ref={chartRef} style={{ width: "600px", height: "400px" }}></div>
    </div>
  )
}