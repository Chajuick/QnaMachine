import { useState } from "react";
import { Container } from "../components/Container";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const QnAContent = styled.div`
  max-width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  p.question {
    font-weight: bold;
    margin-bottom: 10px;
    color: rgb(40, 40, 40);
    font-size: 16px;
  }
  p.record {
    color: rgb(80, 80, 80);
    margin-bottom: 10px;
    font-size: 14px;
    strong {
      
    }
  }
  textarea {
    width: 100%;
    border: 1px solid rgb(150, 150, 150);
    outline: none;
    padding: 10px;
  }
  button {
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
  }
  button:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    color: rgb(40, 40, 40);
  }
`;

const AnswerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: ${props => (props.$isShow ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000; 
  
`;

const AnswerModal = styled.div`
  max-width: 50vw;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: ${props => (props.$isShow ? 'block' : 'none')};
`;

const MyAnswer = styled.div`
  p:first-child {
    padding: 10px;
    background: linear-gradient(270deg, rgba(103,103,103,1) 0%, rgba(0,0,0,1) 100%);
    color: rgb(250, 250, 250);
    border-radius: 8px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  p:last-child {
    font-size: 14px;
  }
`;

const ModelAnswer = styled.div`
  p:first-child {
    margin-top: 20px;
    padding: 10px;
    background: linear-gradient(270deg, rgba(103,103,103,1) 0%, rgba(0,0,0,1) 100%);
    color: rgb(250, 250, 250);
    border-radius: 8px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  p:last-child {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const Btns = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    width: 40%;
    padding: 8px 0;
    font-size: 14px;
    border-radius: 4px;
    transition: all 400ms;
    pointer-events: ${props => props.disabled? "none":"auto"};
    opacity: ${props => props.disabled? 0.5:1};
    border: 1px solid rgb(40, 40, 40);
  }
  button:first-child {
    background-color: rgb(40, 40, 40);
    color: rgb(250, 250, 250);
  }
  button:first-child:hover {
    cursor: pointer;
    background-color: rgb(250, 250, 250);
    color: rgb(40, 40, 40);
  }
  button:last-child {
    background-color: rgb(250, 250, 250);
    color: rgb(40, 40, 40);
  }
  button:last-child:hover {
    cursor: pointer;
    background-color: rgb(40, 40, 40);
    color: rgb(250, 250, 250);
  }
`;

const ScoreModify = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  input {
    width: 30%;
  }
  p {
    width: 50px;
    margin-left: 5px;
    font-size: 16px;
    transition: all 400ms;
  }
`;

// 로컬 스토리지에서 배열을 가져오는 함수
const getFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

const frontEndData = getFromLocalStorage("FrontEndData");
const shuffledData = frontEndData && [...frontEndData].sort(() => Math.random() - 0.5);

export default function RandomQnA() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [finish, setFinish] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    function handleSaveResults() {
      const resultScore = score;
      const resultAnswer = answer;
      const qTitle = shuffledData && shuffledData[currentIndex].q;
    
      // 로컬 스토리지에서 FrontEndData 가져오기
      const storedData = JSON.parse(localStorage.getItem('FrontEndData')) || [];
    
      // qTitle과 일치하는 객체 찾기
      const matchingObject = storedData.find(obj => obj.q === qTitle);
    
      // 일치하는 객체가 있다면 m 배열에 { answer, score } 추가
      if (matchingObject) {
        if (!matchingObject.m) {
          matchingObject.m = [];
        }
        matchingObject.m.push({ answer: resultAnswer, score: resultScore });
      }
    
      // 로컬 스토리지에 업데이트된 FrontEndData 저장
      localStorage.setItem('FrontEndData', JSON.stringify(storedData));
    };

    function handleSubmit() {
      setScore(0);
      setShowAnswerModal(true);
    };

    function handleNext() {
      handleSaveResults();
      setAnswer("");
      setScore(0);
      setShowAnswerModal(false);
      setCurrentIndex(currentIndex+1);
    };

    function handleStop() {
      handleSaveResults();
      setAnswer("");
      setScore(0);
      setShowAnswerModal(false);
      setFinish(true);
      setTimeout(() => navigate("/"), 400);
    };

    function handleFinish() {
      handleSaveResults();
      setAnswer("");
      setScore(0);
      setShowAnswerModal(false);
      setFinish(true);
      setTimeout(() => navigate("/statistics"), 400);
    };

    return(
    <>
    <Container 
      style={{
        maxHeight: finish? "0px" : "1000px",
        padding: finish? "0px" : "32px 28px",
        boxShadow: finish? "0 8px 8px rgba(40, 40, 40, 0)" : "0 4px 4px rgb(40, 40, 40, 0.25)",
      }}
    >
      <QnAContent className="qna-content">
        <p className="question">Q{currentIndex+1}. {shuffledData && shuffledData[currentIndex].q}</p>
        <p className="record">
          전적 :
          <strong style={{ color: "#FF5151" }}> {shuffledData && shuffledData[currentIndex].w}W </strong>
          <strong style={{ color: "#6691FF" }}>{shuffledData && shuffledData[currentIndex].l}L</strong>
        </p>
        <textarea
          className="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          cols={50}
        />
        <button onClick={handleSubmit}>제출</button>
      </QnAContent>
    </Container>
    <AnswerOverlay $isShow={showAnswerModal} className="answer-overlay">
      <AnswerModal $isShow={showAnswerModal} className="answer-modal">
        <MyAnswer className="my-answer">
          <p>내 답변</p>
          <p>-{answer}</p>
        </MyAnswer>
        <ModelAnswer className="model-answer">
          <p>모범답안</p>
          <p>-{shuffledData && shuffledData[currentIndex].a}</p>
        </ModelAnswer>
        <ScoreModify className="score-controlrer" $score={score}>
          <input 
            type="range" min="0" max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        <p style={{ color: score >= 50 ? "#FF5151" : "#6691FF" }}>{score}점</p>
        </ScoreModify >
        {currentIndex === shuffledData.length &&
        <Btns>
          <button onClick={handleFinish}>결과보기</button>
        </Btns>
        }
        {currentIndex !== shuffledData.length &&
        <Btns>
          <button onClick={handleNext}>다음문제</button>
          <button onClick={handleStop}>그만하기</button>
        </Btns>
        }
      </AnswerModal>
    </AnswerOverlay>
    </>
    )
};