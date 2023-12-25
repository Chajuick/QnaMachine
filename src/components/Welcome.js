import { useState } from "react"
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(250, 250, 250);
    padding: 32px 28px;
    border-radius: 16px;
    background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, rgba(101,254,195,1) 0%, rgba(0,176,255,1) 100%);
    border: 3px solid transparent;
    background-origin: padding-box;
    background-clip: padding-box, border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 8px 8px rgb(40, 40, 40, 0.5);
    transition: all 400ms;
    overflow: hidden;
    div.logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
            width: 20px;
            height: auto;
            margin-right: 4px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
    }
    &>p {
        margin-top: 20px;
        text-align: center;
    }
    input {
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
    }
    input:focus {
        box-shadow: 0 2px 4px rgba(40, 40, 40, 1);
        border: none;
        border-bottom: 1px solid rgb(150, 150, 150);
        outline: none;
    }
`;

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

export default function Welcome({ isRegistered, user, setUser, FrontEndData }) {

    return(
    <>
    <Container 
        className="login-modal"
        style={{
            maxHeight: !isRegistered? "0px" : "1000px",
            padding: !isRegistered? "0px" : "32px 28px",
            boxShadow: !isRegistered? "0 8px 8px rgba(40, 40, 40, 0)" : "0 8px 8px rgb(40, 40, 40, 0.5)",
        }}
    >
        <div className="logo"> 
            <img src="/favicon.png" alt="logo" />
            <p>FMQnA</p>
        </div>
        <p className="welcome-mes">
            안녕하세요. {user}님<br/>
            {FrontEndData.length}개의 질문이 준비되어 있습니다.
        </p>
        <ConfirmButton 
            className="random-btn" 
            style={{
                marginTop: "20px",
            }}
        >
            랜덤 QnA
        </ConfirmButton>
        <ConfirmButton 
            className="select-btn" 
        >
            질문 선택
        </ConfirmButton>
        <ConfirmButton 
            className="select-btn" 
        >
            통계
        </ConfirmButton>
    </Container>
    </>
    )
};