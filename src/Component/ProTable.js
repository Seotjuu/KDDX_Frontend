import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";

import ProductAddModal from './Modal/ProductAddModal';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProTable() {
    // Array Default
    const [tableRows, setTableRows] = useState([]);

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(false);
    const [delSt, setDelSt] = useState("");
    const [rowIdx, setRowIdx] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // 추가 또는 수정돤 데이터 배열에 저장하기, axios 사용시 필요없는 함수
    // modal창에서 수정, 추가 구현가능할시 지워도 되는 코드.
    const ModalData = (num, name, ea, idx = rowIdx) => {
        const data = {
            ProNum: num,
            ProName: name,
            ProEa: ea
        }

        if(mode){  // 수정
            const newData = [...tableRows]; // 객체 담아서 옮기기
            newData[idx] = data;
            setTableRows(newData);
        }else{
            setTableRows([...tableRows, data]);
        }
    }

    // const GetLastId = (props) => {
    //     axios.get('http://127.0.0.1:8000/product/')
    //     .then(response => {
    //         const data = response.data;
    //         const ids = data.map(product => product.id);
    //         const lastId = ids[ids.length - 1];
    //         // ids에 서버에서 받아온 id 값들이 배열 형태로 저장됩니다.
    //         return lastId;
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }

    // reload시 처음 2번 실행 된 후 modal창이 열리거나 닫힐 경우 실행되는 코드
    useEffect(()=>{
        axios   
        // 모든 행의 데이터 불러옴
        .get("http://127.0.0.1:8000/product/")
        .then((response) => {
            // tableRows 변수 안에 모든 데이터 저장
            // tableRows == 모든 데이터
            
            setTableRows([...response.data]);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [show, mode, delSt]);


    return(
        <div className='TableComponent'>
            <Button onClick={
                () => {
                    handleShow();
                    setMode(false);
                }
            }>
                상품 추가 
                &nbsp;
                <FontAwesomeIcon icon={faPlus} />
            </Button>

            <br/><br/>
            <Table className='Table'>
                <thead>
                    <tr>
                        <td>상품 번호</td>
                        <td>상품 이름</td>
                        <td>수량</td>
                        <td>편집</td>
                    </tr>
                </thead>

                <tbody>
                    {                    
                        (
                            tableRows.map((row, idx)=>{
                                return(
                                    <tr key={idx}>
                                        <td>{row.identifier}</td>
                                        <td>{row.name}</td>
                                        <td>{row.num}</td>
                                        <td>
                                            <Button onClick={()=>{
                                                handleShow();
                                                setMode(true);
                                                setRowIdx(idx);
                                            }}>수정</Button> &nbsp;
                                            <Button onClick={
                                                async ()=>{
                                                    await axios.delete(`http://127.0.0.1:8000/product/${row.identifier}/`);
                                                    setDelSt(row.identifier);
                                                }
                                            }
                                            >삭제</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </Table>


            {show ? <ProductAddModal
                PropFunc={ModalData} handleShow={handleShow} handleClose={handleClose} show={show} mode={mode}
                tableRows={tableRows} rowIdx={rowIdx}
            />: ""}
        </div>
    );
}


