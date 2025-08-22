import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/DashBoard/:id" element={<UserDetail />} />
      </Routes>
    </>
  );
}

export default App;
