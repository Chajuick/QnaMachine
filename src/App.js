import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { FrontEndData } from './components/QnaData';
import Home from './pages/Home';
import RandomQnA from './pages/RandomQnA';
import SelectQnA from './pages/SelectQnA';
import Bck from "./assets/imgs/bck.jpg";

// 글로벌 스타일 정의
const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Pretendard-Regular';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
  }
  * {
    font-family: 'TheJamsil5Bold';
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    width: 100%;
    height: 100vh;
    background-image: url(${Bck});
    background-size: cover;
  }
`;

export default function App() {
  useEffect(() => {
    const storedData = localStorage.getItem('FrontEndData');
    if (!storedData) {
      // FrontEndData를 문자열로 변환하여 저장
      localStorage.setItem('FrontEndData', JSON.stringify(FrontEndData));
    }
  }, []);

  return (
    <>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/randomQnA' element={<RandomQnA />} />
        <Route path='/selectQnA' element={<SelectQnA />} />
      </Routes>
    </Router>
    </>
  );
}
