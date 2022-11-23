
import {  useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes= () => {

    
    const { userInfo,pending} = useSelector((state) => state.user);
    

    return(
        userInfo.isLogedIn===true ? <Outlet>{console.log("islogedin:", userInfo.isLogedIn)}</Outlet> : 
        <Navigate to="/login">{console.log("isloged in nav:", userInfo.isLogedIn)}</Navigate> 
    )
}

export default PrivateRoutes