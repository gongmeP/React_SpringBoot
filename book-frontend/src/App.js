import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Headers from './pages/Header';

function App() {
  return (
    <>
      <Headers />
      <Container>
        <Routes>
          <Route path="/" element={''} />
          <Route path="/savaForm" element={''} />
          <Route path="/book/id" element={''} />
          <Route path="/loginForm" element={''} />
          <Route path="/joinForm" element={''} />
          <Route path="/updateForm" element={''} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
