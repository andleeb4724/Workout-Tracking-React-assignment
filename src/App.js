import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addworkout from "./Components/Addworkout";
import AddUser from "./Components/Addworkout";
import GraphView from "./Components/GraphView";
import Header from "./Components/Header";
import Viewuser from "./Components/Viewuser";
export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Viewuser />} />

        <Route path="add" element={<Addworkout />} />
        <Route path="graph" element={<GraphView />} />
      </Routes>
    </BrowserRouter>
  );
}
