import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function ProductAddModal(props) {
    // Data name
    const [proNum, setProNum] = useState("");   // Modal 상품 번호
    const [proName, setProName] = useState(""); // Modal 상품 이름
    const [proEa, setProEa] = useState("");     // Modal 상품 수량


    const AxiosData = (mode) => {
        console.log(proNum, proName, proEa);
        if(mode){// mode가 true일 때 ( = 수정일 때 ) // axios.put
            axios.put(`http://127.0.0.1:8000/product/${proNum}/`, {
                // POST 요청에 필요한 데이터를 작성합니다.
                    identifier: proNum,
                    name: proName,
                    num: proEa,
                },)
                .then(function (response) {
                console.log(response);
                })
                .catch(function (error) {
                console.log(error);
                });


            console.log("수정, axios.put 입니다.");
            console.log(proNum, proName, proEa);
        }
        // mode가 false일 때 ( = 추가일 때 ) // axios.post
        else{
            axios.post("http://127.0.0.1:8000/product/", {
            // POST 요청에 필요한 데이터를 작성합니다.
                identifier: proNum,
                name: proName,
                num: proEa,
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
            console.log("추가, axios.post 입니다.");
            console.log(proNum, proName, proEa);
        }
        
    }

    // 확인 버튼 클릭시 발동되는 함수
    // Value Check 하는 함수
    const ClickBtn = (okyn) => {    
        if(okyn === "Y"){   // 추가, 수정 확인 Button
            if(proNum === ""){  // 상품 번호가 빈 값일 때
                alert("상품 번호가 입력되지 않았습니다.");
            }
            else if(proName === ""){ // 싱픔 이름이 빈 값일 때
                alert("상품 이름이 입력되지 않았습니다.");
            }
            else if(proEa === ""){  // 싱픔 수량이 빈 값일 때
                alert("수량이 입력되지 않았습니다.");
            }
            else{   // 모든 Input의 값이 있을 때
                if(props.mode){ // 수정 Button 일 때
                    alert("값 수정이 완료되었습니다.");
                }
                else{   // 추가 Button 일 때
                    alert("값 추가가 완료되었습니다.");
                }

                props.PropFunc(proNum, proName, proEa);     // Props에 있는 PropFunc에 매개변수로 상위 컴포넌트에 입력값 보내줌
                props.handleClose();    // 상위 컴포넌트 내에 handleClose 함수 실행 ( 창 닫기 )
                
            }
        }
        else if(okyn === "N"){  // 닫기 Button
            props.handleClose();    // 상위 컴포넌트 내에 handleClose 함수 실행 ( 창 닫기 )
        }
    }

    useEffect(()=>{
        if(props.mode){
            console.log(props.tableRows);
            setProNum(props.tableRows[props.rowIdx].identifier);
            setProName(props.tableRows[props.rowIdx].name);
            setProEa(props.tableRows[props.rowIdx].num);
        }   
    }, [props.show, props.mode, props.tableRows, props.rowIdx])

    return (
        <>
        <Modal show={props.show}>
            <Modal.Header closeButton onClick={()=>props.handleClose()} >
                <Modal.Title>{props.mode ? "상품 수정" : "상품 추가" }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               
                <div className='ModalData'>
                    <div>
                        <label>상품 번호 :</label> {/* primary key */}
                        <input value={proNum}
                            className="name" type='input' style={{border: "black 1px solid"}}
                            onChange={
                                (e)=>{
                                    setProNum(e.target.value);
                                    console.log(proNum);
                                }
                            }
                            ></input>
                    </div>
                    <div>
                        <label>상품 이름 :</label>
                        <input value={proName}
                            className="name" type='input' style={{border: "black 1px solid"}}
                            onChange={
                                (e)=>{
                                    setProName(e.target.value);
                                }
                            }
                            ></input> 
                    </div>
                    <div>
                        <label>수량 :</label>
                        <input value={proEa}
                            className="name" type='number' style={{border: "black 1px solid"}}
                            onChange={
                                (e)=>{
                                    setProEa(e.target.value);
                                }
                            }
                            ></input>
                    </div>
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={()=>{
                    ClickBtn("Y");
                    AxiosData(props.mode);
                }}>
                    {props.mode ? "수정 완료" : "추가 완료" }
                </Button>

                <Button variant="secondary" onClick={()=>{
                    ClickBtn("N");
                }}>
                    닫기
                </Button>
               
            </Modal.Footer>
        </Modal>
        </>
    );
}


