import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import Inventory from './Components/Inventory/Inventory';
import { useEffect } from 'react';
import { isLoggedIn } from './helpers';

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/inventory')
    }
  }, []) 

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<p>Splash placeholder</p>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<p>signup placeholder</p>} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/profile' element={<p>profile Placeholder</p>} />
        <Route path='/about' element={<p>about Placeholder</p>} />
      </Routes>
    </div>
  );
}

export default App;
