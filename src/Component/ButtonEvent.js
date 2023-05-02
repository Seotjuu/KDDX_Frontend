import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

export default function ButtonEvent(){
    const [btn, setBtn] = useState(false);

    useEffect(()=>{
        if(btn === false){
          document.getElementsByClassName("name")[0].disabled = true;
        }
        else{
          document.getElementsByClassName("name")[0].disabled = false;
        }
      }, [btn]);

    return(
        <div className='inputGroup'>
          <span>담당자 : </span>
          <input className="name" type='input' style={{border: "black 1px solid"}}>
          </input>
          &emsp;
          <Button 
            onClick={()=>{
              setBtn(!btn);
            }}
          >
              {btn?"적용":"수정"}
          </Button>
        </div>
    )
}