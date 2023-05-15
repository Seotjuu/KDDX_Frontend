import React from 'react';

export default function Legend(props){
    
    const AllData = props.value;

    console.log(AllData);

    return(
        <div className="Legend" style={{border: "solid black 1px", padding: "20px", margin: "20px", display: "inline-block" }}>
          {
            AllData.map((val, idx)=>
             (
              <div key={idx} style={{ textAlign: "center", margin: "20px 0px" }}>
                <div style={{width: "30px", display: "inline-block", height: "30px", backgroundColor: val.color}}></div> &nbsp; 
                <div style={{width: "30px", display: "inline-block" }}>{val.name}</div> &nbsp;
              </div>
              
             )
            )
          }
      </div>
    )
}