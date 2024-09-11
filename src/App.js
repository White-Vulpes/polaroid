import Home from "./pages/home/Home";
import Galleria from "./pages/galleria/Galleria";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galleria" element={<Galleria />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
