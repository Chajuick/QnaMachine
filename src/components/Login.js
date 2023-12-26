import { useState } from "react"
import styled from "styled-components";
import { Container } from "./Container";
import Logo from "../assets/imgs/logo.png";

const NameInput = styled.input`
    width: 100%;
    margin-top: 20px;
    border: none;
    outline: none;
    background-color: white;
    box-shadow: 0 2px 2px rgba(150, 150, 150, 0.5);
    border-bottom: 1px solid rgb(150, 150, 150);
    transition: all 400ms;
    padding: 4px 10px;
    color: rgb(80, 80, 80);
    &:focus {
        box-shadow: 0 2px 4px rgba(40, 40, 40, 1);
        border: none;
        border-bottom: 1px solid rgb(150, 150, 150);
        outline: none;
    }
`;

const ConfirmButton = styled.button`
    margin-top: 12px;
    width: 100%;
    padding: 4px;
    font-size: 14px;
    border-radius: 4px;
    background-color: rgb(40, 40, 40);
    border: 1px solid rgb(40, 40, 40);
    color: rgb(250, 250, 250);
    transition: all 400ms;
    pointer-events: ${props => props.disabled? "none":"auto"};
    opacity: ${props => props.disabled? 0.5:1};
    &:hover {
        cursor: pointer;
        background-color: rgb(250, 250, 250);
        color: rgb(40, 40, 40);
    }
`;

export default function Login({ onRegister }) {
    const [name, setName] = useState("");
    const [finish, setFinish] = useState(false);

    function handleRegister() {
        localStorage.setItem('user', name);
        setFinish(true);
        // 400ms 후에 onRegister 함수 호출
        setTimeout(onRegister, 400);
    };

    return(
    <>
    <Container 
        className="login-modal"
        style={{
            maxHeight: finish? "0px" : "1000px",
            padding: finish? "0px" : "32px 28px",
            boxShadow: finish? "0 8px 8px rgba(40, 40, 40, 0)" : "0 4px 4px rgb(40, 40, 40, 0.25)",
        }}
    >
        <div className="logo"> 
            <img src={Logo} alt="logo" />
            <p>FMQnA</p>
        </div>
        <p className="welcome-mes">안녕하세요?<br/>이름을 입력해주세요.</p>
        <NameInput
            className="name-input" 
            type="text" maxLength={6} 
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}    
        />
        <ConfirmButton 
            className="contirm-btn" onClick={handleRegister}
            disabled={name.length < 1}
        >확인</ConfirmButton>
    </Container>
    </>
    )
};