import { useState } from "react"
import styled from "styled-components";
import { Container } from "./Container";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/imgs/logo.png";

const ConfirmButton = styled.button`
    margin-top: 4px;
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

export default function Welcome({ user, setUser, FrontEndData }) {
    const [isSelect, setIsSelect] = useState(false);
    const navigate = useNavigate();

    function handleClickRandomQnA() {
        if (!isSelect) {
            setIsSelect(true);
            setTimeout(() => navigate("/randomQnA"), 400);
        } 
    };

    function handleClickSelectQnA() {
        if (!isSelect) {
            setIsSelect(true);
            setTimeout(() => navigate("/selectQnA"), 400);
        } 
    };

    function handleClickStatistics() {
        if (!isSelect) {
            setIsSelect(true);
            setTimeout(() => navigate("/statistics"), 400);
        } 
    };

    return(
    <>
    <Container 
        className="login-modal"
        style={{
            maxHeight: isSelect? "0px" : "1000px",
            padding: isSelect? "0px" : "32px 28px",
            boxShadow: isSelect? "0 8px 8px rgba(40, 40, 40, 0)" : "0 4px 4px rgb(40, 40, 40, 0.25)",
        }}
    >
        <div className="logo"> 
            <img src={Logo} alt="logo" />
            <p>FMQnA</p>
        </div>
        <p className="welcome-mes">
            안녕하세요. {user}님<br/>
            {FrontEndData.length}개의 질문이 준비되어 있습니다.
        </p>
        <ConfirmButton 
            className="select-btn" 
            style={{
                marginTop: "20px",
            }}
            onClick={handleClickRandomQnA}
        >
            랜덤 QnA
        </ConfirmButton>
        <ConfirmButton 
            className="select-btn" 
            onClick={handleClickSelectQnA}
        >
            질문 선택
        </ConfirmButton>
    </Container>
    </>
    )
};