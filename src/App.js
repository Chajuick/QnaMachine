import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';

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
    height: 100%;
  }
`;

export default function App() {
  return (
    <>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
}
