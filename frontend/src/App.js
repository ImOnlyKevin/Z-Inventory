import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import { useEffect } from 'react';
import { isLoggedIn } from './helpers';

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/home')
    }
  }, []) 

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<p>Splash placeholder</p>} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<p>Home Placeholder</p>} />
      </Routes>
    </div>
  );
}

export default App;
