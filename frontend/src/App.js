import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import MyInv from './Components/MyInv/MyInv';
import MyItem from './Components/MyInv/MyItem';
import Inv from './Components/Inv/Inv';
import Item from './Components/Inv/Item';
import Splash from './Components/Splash/Splash';
import Signup from './Components/Signup/Signup';
import Profile from './Components/Profile/Profile';
import { useEffect } from 'react';
import { isLoggedIn } from './helpers';

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/myinv')
    }
  }, []) 

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/myinv' element={<MyInv />} />
        <Route path='/myinv/item' element={<MyItem />} />
        <Route path='/inv' element={<Inv />} />
        <Route path='/inv/item' element={<Item />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<p>This would be a cool feature to have later</p>} />
      </Routes>
    </div>
  );
}

export default App;
