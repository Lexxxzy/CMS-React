import './App.css';
import "./styles/app.sass";
import SideMenu from './components/SideMenu/sideMenu.component';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login.component';
import Register from './components/Register/register.component';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isLoggedIn } from './calls/authCalls';

function App() {
  const dispatchAction = useDispatch();
  const { isLogedIn } = useSelector((state) => state.user.userInfo);
  useEffect(() => { if(!isLogedIn){ isLoggedIn(dispatchAction); }}, []);

  return (
    <Routes>
      
      <Route path="/">
        <Route index element={isLogedIn ? <SideMenu/> : <Login />}/>
      </Route>
      
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
  );
}

export default App;
