import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export default function Graph(){
  const chartRef = useRef(null);

  const [show, setShow] = useState(false);
  
  useEffect(()=>{
    if(show === true){
        {
          Chart();
        }
    }
  }, [show]);

  const Chart = () => {
    {
      <h1>asd</h1>
    }
  };

  return(
      <div className='GraphGroup'>
          <div className='LineChart'>
              LineChart
          </div>
              
          <button className='addBtn' ref={chartRef}
              onClick={()=>{
                setShow(!show);
              }}
          >   
            BarChart
          </button>
      </div>
  )
}