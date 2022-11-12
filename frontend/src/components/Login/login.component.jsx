import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/button.component'
import LoginFormInput from './Form/loginForm.component'

export default function Login() {
    const navigate = useNavigate()

    const NavigateToRegister = () => {
        navigate("/register")
    }

    const HandleLogin = () => {
        navigate("/")
    }
    return (
        <div className='flex flex-col h-screen justify-center'>
            <div className='m-auto pb-40 min-w-fit w-1/6'>

                <h2 className='text-gray-50 text-2xl font-extrabold'>Sign In</h2>
                <p className='text-slate-400 font-medium pb-10'>Enter your email and password to sign in</p>

                <LoginFormInput placeholder="Your email address or login" label="Login" />
                <LoginFormInput placeholder="Your password" label="Password" />

                <Button buttonText="Sign In" onClick={HandleLogin}/>

                <div className='pt-5 text-center'>
                    <span className='text-slate-400 font-normal'>Don't have an account?</span>
                    <button className='text-slate-50 font-semibold pl-2' onClick={NavigateToRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}
