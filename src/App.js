import './App.css';
import Home from './pages/home/Home'
import Galleria from './pages/galleria/Galleria';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/galleria" element={ <Galleria /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
