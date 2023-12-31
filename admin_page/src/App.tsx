import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Headers from './components/MainComponents/Header';
import SaveForm from './pages/animation/SaveForm';
import Detail from './pages/animation/Detail';
import LoginForm from './pages/user/LoginForm';
import UpdateForm from './pages/animation/UpdateForm';
import JoinForm2 from './pages/user/JoinForm2';
import Footer from './components/MainComponents/Footer';
import FreeBoard from './pages/FreeBoard/FreeBoard';
import DetailFreeBoard from './pages/FreeBoard/DetailFreeBoard';
import UpdateFreeBoard from './pages/FreeBoard/UpdateFreeBoard';
import AllList from './pages/animation/AllLIst';
import UserList from './pages/user/UserList';
import { useState } from 'react';
import NotAdmin from './components/MainComponents/NotAdmin';
import SaveBanner from './pages/Banner/SaveBanner';
import BannerList from './pages/Banner/BannerList';
import UpdateBanner from './pages/Banner/UpdateBanner';

const App = () => {
  const navigate = useNavigate();
  const [adminLogin, setAdminLogin] = useState(
    window.sessionStorage.getItem('loginID'),
  );
  return (
    <>
      <Headers />
      <Container style={{ margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/joinForm" element={<JoinForm2 />} />
          {adminLogin !== null ? (
            <>
              <Route path="/savaForm" element={<SaveForm />} />
              <Route path="/Ani/:id" element={<Detail />} />
              <Route path="/loginForm" element={<LoginForm />} />
              <Route path="/updateForm/:id" element={<UpdateForm />} />
              <Route path="/freeBoard" element={<FreeBoard />} />

              <Route
                path="/detailFreeBoard/:fbNum"
                element={<DetailFreeBoard />}
              />
              <Route
                path="/updateFreeBoard/:fbNum"
                element={<UpdateFreeBoard />}
              />
              <Route path="/allList" element={<AllList />} />
              <Route path="/userlist" element={<UserList />} />
              <Route path="/savebanner" element={<SaveBanner />} />
              <Route path="/bannerlist" element={<BannerList />} />
              <Route
                path="/updatebanner/:bannerId"
                element={<UpdateBanner />}
              />
            </>
          ) : (
            <Route path="/*" element={<NotAdmin />} />
          )}
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
