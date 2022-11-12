import './App.css';
import * as React from 'react';
import "./styles/app.sass";
import SideMenu from './components/SideMenu/sideMenu.component';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/login.component';
import Register from './components/Register/register.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SideMenu />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
  );
}

export default App;
