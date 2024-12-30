import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyDetail from "./Components/CompanyDetail";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:id" element={<CompanyDetail />}/>
        </Routes>
      </Router>
    </div>  
  );
}

export default App;
