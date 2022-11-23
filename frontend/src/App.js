import './App.css';
import "./styles/app.sass";
import SideMenu from './components/SideMenu/sideMenu.component';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login.component';
import Register from './components/Register/register.component';
import PrivateRoutes from './utils/PrivateRoutes';
import { useEffect } from 'react';
import { isLoggedIn } from './calls/authCalls';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatchAction = useDispatch();
  useEffect(() => { isLoggedIn(dispatchAction); console.log("enre")}, []);
  const { userInfo,pending} = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>

      <Route element={<PrivateRoutes/>}>         
      </Route>

      {userInfo.isLogedIn===true ? <Route path='/' element={<SideMenu/>} /> 
                                  : <Route path='/' element={<Login/>} />}
    </Routes>
  );
}

export default App;
