import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./OnePageCRUD";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListPage />} />
      </Routes>
    </>
  );
}

export default App;
