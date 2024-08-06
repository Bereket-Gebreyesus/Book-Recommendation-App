import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import CreateUser from "./pages/User/CreateUser";
import UserList from "./pages/User/UserList";
import UploadBookPage from "./pages/Book/UploadBook";
import BookDetail from "./pages/Book/BookDetail";
import Search from "./pages/Search";
import TagsPage from "./pages/TagsPage";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/book/upload" element={<UploadBookPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/tags" element={<TagsPage />} />
      </Routes>
    </>
  );
};

export default App;
