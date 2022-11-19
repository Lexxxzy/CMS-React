import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/button.component'
import LoginFormInput from './Form/loginForm.component'
import { useDispatch, useSelector } from "react-redux";
import { logUserIn } from '../../calls/authCalls';
import Loader from '../Loader/index';

export default function Login() {
    const navigate = useNavigate()
    const dispatchAction = useDispatch();


    const [account, setAccount] = useState({
        email: '',
        password: '',
        confirmPassword: ''
      });

    const { pending, error, errorText } = useSelector((state) => state.user)
    
    const onInputChange = e => {
        const { name, value } = e.target;
        setAccount(prev => ({
          ...prev,
          [name]: value
        }));
      }
      
    
    const NavigateToRegister = () => {
        navigate("/register")
    }

    const HandleLogin = () => {
        logUserIn(account.email, account.password, dispatchAction);
    }
    return (
        <div className='flex flex-col h-screen justify-center'>
            <div className='m-auto pb-40 min-w-fit w-1/6'>

                <h2 className='text-gray-50 text-2xl font-extrabold'>Sign In</h2>
                <p className='text-slate-400 font-medium pb-10'>Enter your email and password to sign in</p>

                <LoginFormInput placeholder="Your email address or login" name="email" value={account.email} label="Login" onChange={onInputChange} errorBorder={error}/>
                <LoginFormInput placeholder="Your password" name="password" value={account.password} label="Password" type='password' onChange={onInputChange} extraStyles={error && "mb-0 pb-2"} errorBorder={error}/>
                {error && <div className='text-red-500 text-m font-normal pb-5 pl-3'>
                    {errorText}
                </div>}

                <Button onClick={HandleLogin} >
                {pending===true ? <Loader className={'my-2.5 m-auto'}></Loader> : "Sign In"}
                
                </Button>

                <div className='pt-5 text-center'>
                    <span className='text-slate-400 font-normal'>Don't have an account?</span>
                    <button className='text-slate-50 font-semibold pl-2' onClick={NavigateToRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}
