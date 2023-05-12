import React, { useState, useEffect, useRef } from 'react';

export default function Chart(){
  const chartRef = useRef(null);
  
  return(
    <div className="Chart" style={{ margin: "100px" }}>
      <div>
        <h3>Graph Name</h3>
      </div>
      
      <div
        ref={chartRef}
        style={{ width: "500px", height: "500px", overflowX: "scroll" }}></div>
    </div>
  )
}