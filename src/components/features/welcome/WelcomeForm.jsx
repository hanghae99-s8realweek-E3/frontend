import React,{useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


function WelcomeForm () {
    const navigate = useNavigate();
    const [modalState, setModalState] = useState("on");

    const onClick = (e) => {

        setModalState("off")
        navigate('/')
    }

    return (
        <>
            {modalState === "on" ? 
            //바같쪽 배경
            <div onClick={onClick} style={{position:"absolute", background:"white", zIndex:3, height:"100vh", width:"100vw"}}>
            {/* //e.stopPropagation() 는 배경만 눌렀을때 모달이 꺼지게한다 (모달창눌럿을때는 변화없음) */}
                <StContainer onClick={(e) => e.stopPropagation()} style={{background:"gray", height:"600px", width:"600px", margin:"80px auto"}}>
                    <div>
                        <button type="submit" style={{margin:"10px 10px auto auto", background:"none" }} onClick={onClick}>X</button>
                        <StText>
                            <h5># 오늘부터 #내가 #따라쟁이</h5>
                            <div>
                                <h2>
                                <p>미믹 친구가</p>
                                <p>되신 것을 환영합니다.</p>
                                우리 함께 따라해봐요:)</h2>
                            </div>
                        </StText>
                    </div>
                </StContainer>
            </div>
            : <></>}
            {/* <button style={{position:"relative"}} onClick={()=> setModalState("on")}>창열기</button> */}
        </>
        )
}

export default WelcomeForm;

const StContainer=styled.div`
border-radius: 5px;
width:500px;
`
const StText=styled.div`
    color: black;
    display:block;
align-items:left;
justify-content:left;
text-align: left;
margin:50% auto 0 30px;

`