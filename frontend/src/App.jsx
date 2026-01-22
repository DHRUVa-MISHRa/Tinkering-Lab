import React, { useLayoutEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Project from "./pages/Project";
import Member from "./pages/Member";
import Startup from "./pages/Startup";
import About from "./pages/About";
// import Faltu from "./pages/faltu";

export const ServerURL = "http://localhost:3000"|| "https://tinkering-lab-2081.onrender.com";

const App = () => {


  return (
    <div>
      <div className="h-[20px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/members" element={<Member />} />
        <Route path="/startups" element={<Startup />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/a" element={<Faltu />} /> */}
      </Routes>
    </div>
  );
};

export default App;
