import "./App.css";

import Home from "./components/Home";

import StudentDetail from "./components/StudentDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/detail/:id" element={<StudentDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
