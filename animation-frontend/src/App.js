import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Headers from './components/MainComponents/Header';
import Home from './pages/animation/Home';
import Detail from './pages/animation/Detail';
import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import JoinForm2 from './pages/user/JoinForm2';
import Footer from './components/MainComponents/Footer';
import SaveFreeBoard from './pages/FreeBoard/SaveFreeBoard';
import FreeBoard from './pages/FreeBoard/FreeBoard';
import DetailFreeBoard from './pages/FreeBoard/DetailFreeBoard';
import UpdateFreeBoard from './pages/FreeBoard/UpdateFreeBoard';
import AllList from './pages/animation/AllLIst';
import DailyAniList from './pages/DailyAniList/DailyAniList';
import Mypage from './pages/MyPage/Mypage';
import UserUpdateForm from './pages/user/UserUpdateForm';

function App() {
  return (
    <>
      <Headers />
      <Container style={{ margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ani/:id" element={<Detail />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/joinForm" element={<JoinForm />} />
          <Route path="/joinForm2" element={<JoinForm2 />} />
          <Route path="/freeBoard" element={<FreeBoard />} />
          <Route path="/saveFreeBoard" element={<SaveFreeBoard />} />
          <Route path="/detailFreeBoard/:fbNum" element={<DetailFreeBoard />} />
          <Route path="/updateFreeBoard/:fbNum" element={<UpdateFreeBoard />} />
          <Route path="/allList" element={<AllList />} />
          <Route path="/dailyAniList" element={<DailyAniList />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/userupdateForm" element={<UserUpdateForm />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
