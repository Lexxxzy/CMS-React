import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/button.component'
import LoginFormInput from '../Login/Form/loginForm.component'
import Dropdown from '../Dropdown'
import { registerUser, registerUserFirstStep } from '../../calls/authCalls'
import { useDispatch, useSelector } from 'react-redux'

export default function Register() {

    const navigate = useNavigate()
    const dispatchAction = useDispatch()
    const [firstStep, setFirstStep] = useState(true)

    const options = ['Сотрудник', 'Менеджер', 'Админ'];
    const [selectedRole, setRole] = useState(options[0]);
    const { error, errorText } = useSelector((state) => state.user);
    const [account, setAccount] = useState({
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
        role: selectedRole,
        surname: '',
        name: '',
        middle_name: '',
        tin: '',
        passport: '',
        position: ''
    })

    const NavigateToLogin = () => {
        navigate("/login")
    }



    const HandleFirstStep = (async () => {

        const isValid = await registerUserFirstStep(account, dispatchAction);
        console.log(errorText)
        if (isValid) {
           setFirstStep(false);
        }
    });

    const HandleRegister = () => {
        registerUser(account, dispatchAction, navigate)
    }

    const onInputChange = e => {
        const { name, value } = e.target;
        setAccount(prev => ({
            ...prev,
            [name]: value
        }));

    }

    return (
        <div className='flex flex-col h-screen justify-center min-w-fit'>
            <div className={`m-auto pb-40 ${firstStep ? 'w-1/6' : 'w-1/4'}`}>

                <h2 className='text-gray-50 text-2xl font-extrabold'>Sign Up</h2>


                {firstStep ?

                    <div>
                        <p className='text-slate-400 font-medium pb-10'>Register new account</p>

                        <div className='flex justify-between' >
                            <LoginFormInput placeholder="Your login" value={account.login} label="Login" extraStyles="mr-5" name="login" onChange={onInputChange} errorBorder={error}/>
                            <LoginFormInput placeholder="Your email" value={account.email} label="E-mail" name="email" onChange={onInputChange} errorBorder={error}/>
                        </div>
                        <LoginFormInput placeholder="Your password" value={account.password} label="Password" name="password" onChange={onInputChange} errorBorder={error}/>
                        <LoginFormInput placeholder="Your password" value={account.confirmPassword} label="Confirm password" name="confirmPassword" onChange={onInputChange} errorBorder={error}/>

                        <div className='pb-5'>
                            <label
                                className="mb-2.5 pl-2 block text-s font-bold text-gray-900 dark:text-slate-200"
                            >
                                Role
                            </label>
                            <Dropdown
                                options={options}
                                value={selectedRole}
                                setValue={setRole}
                            />
                        </div>
                        {error && <div className='text-red-500 text-m font-normal pb-5 pl-3'>
                        {errorText}
                    </div>}
                        <Button buttonText="Next step" onClick={HandleFirstStep} type="submit" />

                        <div className='pt-5 text-center'>
                            <span className='text-slate-400 font-normal'>Already have an account?</span>
                            <button className='text-slate-50 font-semibold pl-2' onClick={NavigateToLogin}>Login</button>
                        </div>
                    </div> :
                    <div >
                        <p className='text-slate-400 font-medium pb-10'>Fill in personal info</p>
                        <div className='flex justify-between'>
                            <LoginFormInput placeholder="Фамилия" value={account.surname} label="Surname" extraStyles="mr-5" name="surname" onChange={onInputChange} errorBorder={error}/>
                            <LoginFormInput placeholder="Имя" value={account.name} label="Name" extraStyles="mr-5" name="name" onChange={onInputChange} errorBorder={error}/>
                            <LoginFormInput placeholder="Отчество" value={account.middle_name} label="Middle name" name="middle_name" onChange={onInputChange} errorBorder={error}/>
                        </div>

                        <LoginFormInput placeholder="Менеджер" value={account.position} label="Position" name="position" onChange={onInputChange} errorBorder={error} />
                        <LoginFormInput placeholder="ИНН" value={account.tin} label="TIN" name="tin" onChange={onInputChange} errorBorder={error}/>
                        <LoginFormInput placeholder="0000 000000" value={account.passport} label="Passport" name="passport" onChange={onInputChange} errorBorder={error}/>
                        {error && <div className='text-red-500 text-m font-normal pb-5 pl-3'>
                        {errorText}
                        </div>}
                        <div className='flex justify-between'>
                            <Button buttonText="Go back" onClick={() => setFirstStep(true)} isSecondOrder={true} />
                            <Button buttonText="Register" onClick={HandleRegister} extraStyles="ml-5" />
                        </div>
                    </div>}

            </div>
        </div>
    )
}
