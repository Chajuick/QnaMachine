import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";

const QnATable = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 60vw;
  max-height: 80vh;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 250, 250);
  padding: 32px 28px;
  padding-top: 0;
  border-radius: 16px;
  background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, rgba(101,254,195,1) 0%, rgba(0,176,255,1) 100%);
  border: 3px solid transparent;
  background-origin: padding-box;
  background-clip: padding-box, border-box;
  transition: all 400ms;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  ul {
    list-style: none;
  }
  ul.qna-thead {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    border-radius: 8px 8px 0 0;
    background-color: rgb(40, 40, 40);
    color: rgb(250, 250, 250);
    font-size: 16px;
    li {
      text-align: center;
    }
    li:first-child {
      width: 5%;
    }
    li:nth-child(2) {
      width: 75%;
    }
    li:nth-child(3) {
      width: 10%;
    }
    li:last-child {
      width: 10%;
    }
  }
  ul.qna-tbody {
    width: 100%;
    li {
      width: 100%;
      background-color: inherit;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 0;
      border: 1px solid rgba(200 , 200, 200, 0);
      border-bottom: 1px solid  rgb(200, 200, 200);
      transition: all 400ms;
      color: rgb(80, 80, 80);
      p {
        text-align: center;
      }
      p:first-child {
        width: 5%;
      }
      p:nth-child(2) {
        width: 75%;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-child(3) {
        width: 10%;
      }
      p:last-child {
        width: 10%;
      }
    }
    li:hover {
      cursor: pointer;
      border: 1px solid rgb(150, 150, 150);
      color: rgb(40, 40, 40);
      transform: scale(101%);
    }
  }
`;

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

const BackBtn = styled.div`
  background-color: rgba(250, 250, 250, 0.75);
  position: sticky;
  top: 0;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  z-index: 999;
  button {
    width: 20%;
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

// 로컬 스토리지에서 배열을 가져오는 함수
const getFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

// 배열의 평균을 계산하는 함수
function calculateAverageScore(arr) {
  if (arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce((acc, current) => acc + parseInt(current.score), 0);
  return parseInt(sum / arr.length);
};

export default function SelectQnA() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [querstionShow, setQuerstionShow] = useState(false);
  const [score, setScore] = useState(0);
  const [frontEndData, setFrontEndData] = useState(getFromLocalStorage("FrontEndData"));
  const navigate = useNavigate();
  const [finish, setFinish] = useState(false);

  function handleSaveResults() {
    const resultScore = score;
    const resultAnswer = answer;
    const qTitle = frontEndData[currentIndex].q;
  
    // 로컬 스토리지에서 FrontEndData 가져오기
    const storedData = JSON.parse(localStorage.getItem('FrontEndData')) || [];
  
    // qTitle과 일치하는 객체 찾기
    const matchingObject = storedData.find(obj => obj.q === qTitle);
  
    // 일치하는 객체가 있다면 m 배열에 { answer, score } 추가
    if (matchingObject) {
      if (!matchingObject.m) {
        matchingObject.m = [];
      }
  
      // score가 50 이상이면 'w' +1, 아니면 'l' +1
      if (resultScore >= 50) {
        matchingObject.w = (matchingObject.w || 0) + 1;
      } else {
        matchingObject.l = (matchingObject.l || 0) + 1;
      }
  
      matchingObject.m.push({ answer: resultAnswer, score: resultScore });
    }
  
    // 로컬 스토리지에 업데이트된 FrontEndData 저장
    localStorage.setItem('FrontEndData', JSON.stringify(storedData));
  };
  
  function handleSelectQnA(index) {
    setCurrentIndex(index);
    setQuerstionShow(true);
  };

  function handleFinish() {
    handleSaveResults();
    setAnswer("");
    setScore(0);
    setShowAnswerModal(false);
    setQuerstionShow(false);
  };

  function handleSubmit() {
    setScore(0);
    setShowAnswerModal(true);
  };

  useEffect(() => {
    setFrontEndData(getFromLocalStorage("FrontEndData"));
  }, [showAnswerModal]);

  function handlePrev() {
    setFinish(true);
    setQuerstionShow(false);
    setTimeout(() => navigate("/"), 400);
  }

  return (
    <>
    <QnATable className="qna-table"
      style={{
        maxHeight: finish? "0px" : "80vh",
        padding: finish? "0px" : "32px 28px",
        paddingTop: "0px",
        boxShadow: finish? "0 8px 8px rgba(40, 40, 40, 0)" : "0 4px 4px rgb(40, 40, 40, 0.25)",
      }}
    >
      <BackBtn>
        <button onClick={handlePrev}>뒤로가기</button>
      </BackBtn>
      <ul className="qna-thead">
        <li>No</li>
        <li>Question</li>
        <li>Count</li>
        <li>Average</li>
      </ul>
      <ul className="qna-tbody">
        {frontEndData.map((item, index) => (
        <li key={index} onClick={() => handleSelectQnA(index)}>
          <p>{index+1}</p>
          <p>{item.q}</p>
          <p>{item.m.length}</p>
          <p>{calculateAverageScore(item.m)}</p>
        </li>
        ))}
      </ul>
    </QnATable>
    <Container 
      style={{
        maxHeight: !querstionShow? "0px" : "1000px",
        padding: !querstionShow? "0px" : "32px 28px",
        boxShadow: !querstionShow? "0 8px 8px rgba(40, 40, 40, 0)" : "0 4px 4px rgb(40, 40, 40, 0.25)",
    }}
    >
      <QnAContent className="qna-content">
        <p className="question">Q{currentIndex+1}. {frontEndData[currentIndex].q}</p>
        <p className="record">
          전적 :
          <strong style={{ color: "#FF5151" }}> {frontEndData[currentIndex].w}W </strong>
          <strong style={{ color: "#6691FF" }}>{frontEndData[currentIndex].l}L</strong>
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
          <p>-{frontEndData[currentIndex].a}</p>
        </ModelAnswer>
        <ScoreModify className="score-controlrer" $score={score}>
          <input 
            type="range" min="0" max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        <p style={{ color: score >= 50 ? "#FF5151" : "#6691FF" }}>{score}점</p>
        </ScoreModify >
        <Btns>
          <button onClick={handleFinish}>닫기</button>
        </Btns>
      </AnswerModal>
    </AnswerOverlay>
    </>
  );
};