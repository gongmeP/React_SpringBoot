import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Headers from './components/Header';
import Home from './pages/book/Home';
import SaveForm from './pages/book/SaveForm';
import Detail from './pages/book/Detail';
import LoginForm from './pages/user/LoginForm';
import JoinForm from './pages/user/JoinForm';
import UpdateForm from './pages/book/UpdateForm';
import JoinForm2 from './pages/user/JoinForm2';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Headers />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/savaForm" element={<SaveForm />} />
          <Route path="/book/:id" element={<Detail />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/joinForm" element={<JoinForm />} />
          <Route path="/joinForm2" element={<JoinForm2 />} />
          <Route path="/updateForm/:id" element={<UpdateForm />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
