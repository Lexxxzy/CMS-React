import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/button.component'
import LoginFormInput from '../Login/Form/loginForm.component'
import Dropdown from '../Dropdown'

export default function Register() {
    const navigate = useNavigate()

    const NavigateToLogin = () => {
      navigate("/login")
    }

    const HandleRegister = () => {
        navigate("/")
    }

    const options = ['Сотрудник', 'Менеджер', 'Админ'];
    const [activeTab, setActiveTab] = useState(options[0]);
    
    return (
        <div className='flex flex-col h-screen justify-center'>
            <div className='m-auto pb-40 min-w-fit w-1/6'>

                <h2 className='text-gray-50 text-2xl font-extrabold'>Sign Up</h2>
                <p className='text-slate-400 font-medium pb-10'>Register new account</p>

                <LoginFormInput placeholder="Your email address or login" label="Login" />
                <LoginFormInput placeholder="Your password" label="Password" />
                <LoginFormInput placeholder="Your password" label="Confirm password" />

                <div className='pb-5'>
                    <label
                    className="mb-2.5 pl-2 block text-s font-bold text-gray-900 dark:text-slate-200"
                    >
                        Role
                    </label>
                    <Dropdown
                        options={options}
                        value={activeTab}
                        setValue={setActiveTab}
                    />
                </div>
                <Button buttonText="Register" onClick={HandleRegister}/>

                <div className='pt-5 text-center'>
                    <span className='text-slate-400 font-normal'>Already have an account?</span>
                    <button className='text-slate-50 font-semibold pl-2' onClick={NavigateToLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}
