import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import UploadBookPage from "./pages/Books/UploadBook";
import BookDetail from "./pages/Book/BookDetail";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/book/upload" element={<UploadBookPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
};

export default App;
