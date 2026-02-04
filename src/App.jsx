import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Login from "./components/Login";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import "./index.css";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken} />
          <hr />
          <SideBar />

          <Routes>
           <Route path="/" element={<Navigate to="/add" replace />} />
            <Route path="/add" element={<Add token={token}/>} />
            <Route path="/list" element={<List token={token}/>} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
