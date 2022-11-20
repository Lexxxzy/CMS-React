import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from '../calls/authCalls';

const PrivateRoutes= () => {

    const dispatchAction = useDispatch();
    const { userInfo,pending} = useSelector((state) => state.user);
    useEffect(() => { isLoggedIn(dispatchAction); }, []);

    return(
        userInfo.isLogedIn===true ? <Outlet>{console.log("islogedin:", userInfo.isLogedIn)}</Outlet> : 
        <Navigate to="/login">{console.log("isloged in nav:", userInfo.isLogedIn)}</Navigate> 
    )
}

export default PrivateRoutes