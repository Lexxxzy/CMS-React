import './App.css';
import "./styles/app.sass";
import SideMenu from './components/SideMenu/sideMenu.component';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login.component';
import Register from './components/Register/register.component';
import PrivateRoutes from './utils/PrivateRoutes';
import { useEffect } from 'react';
import { isLoggedIn } from './calls/authCalls';
import { useDispatch } from 'react-redux';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>

      <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<SideMenu/>} />
      </Route>
    </Routes>
  );
}

export default App;
