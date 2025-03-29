import logo from './logo.svg';
import Login from './Login';
import './App.css';
import HousePricePredictor from './HousePricePredictor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/predict" element={<HousePricePredictor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;