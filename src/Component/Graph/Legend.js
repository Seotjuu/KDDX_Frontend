import React from 'react';

export default function Legend(props){
    
    const AllData = props.value;

    return(
        <div className="Legend" style={{border: "solid black 1px", padding: "20px", margin: "20px", display: "flex", flexWrap: "wrap" }}>
          {
            AllData.map((val)=>
             (
              <div style={{display: "flex"}}>
                <label>{val.name}&emsp;</label>
                <div style={{width: "50px", height: "5px", backgroundColor: val.color}}></div>
              </div>
             )
            )
          }
      </div>
    )
}