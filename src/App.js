import './App.css';
import Home from './pages/home/Home'
import Galleria from './pages/galleria/Galleria';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './pages/gallery/Gallery';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/galleria" element={ <Galleria /> } />
          <Route path="/galleria/:id" element={ <Gallery /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
