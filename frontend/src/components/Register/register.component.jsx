import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/button.component'
import LoginFormInput from '../Login/Form/loginForm.component'
import Dropdown from '../Dropdown'

export default function Register() {

    const navigate = useNavigate()
    const [firstStep, setFirstStep] = useState(true)

    const options = ['Сотрудник', 'Менеджер', 'Админ'];
    const [selectedRole, setRole] = useState(options[0]);

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

    const HandleRegister = () => {
        navigate("/")
    }

    const HandleFirstStep = () => {

        console.log(account)
        setFirstStep(false)
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
                            <LoginFormInput placeholder="Your login" value={account.login} label="Login" extraStyles="mr-5" name="login" onChange={onInputChange} />
                            <LoginFormInput placeholder="Your email" value={account.email} label="E-mail" name="email" onChange={onInputChange} />
                        </div>
                        <LoginFormInput placeholder="Your password" value={account.password} label="Password" name="password" onChange={onInputChange} />
                        <LoginFormInput placeholder="Your password" value={account.confirmPassword} label="Confirm password" name="confirmPassword" onChange={onInputChange} />

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

                        <Button buttonText="Next step" onClick={HandleFirstStep} type="submit" />

                        <div className='pt-5 text-center'>
                            <span className='text-slate-400 font-normal'>Already have an account?</span>
                            <button className='text-slate-50 font-semibold pl-2' onClick={NavigateToLogin}>Login</button>
                        </div>
                    </div> :
                    <div >
                        <p className='text-slate-400 font-medium pb-10'>Fill in personal info</p>
                        <div className='flex justify-between'>
                            <LoginFormInput placeholder="Фамилия" value={account.surname} label="Surname" extraStyles="mr-5" name="surname" onChange={onInputChange} />
                            <LoginFormInput placeholder="Имя" value={account.name} label="Name" extraStyles="mr-5" name="name" onChange={onInputChange} />
                            <LoginFormInput placeholder="Отчество" value={account.middle_name} label="Middle name" name="middle_name" onChange={onInputChange} />
                        </div>

                        <LoginFormInput placeholder="Менеджер" value={account.position} label="Position" name="position" onChange={onInputChange} />
                        <LoginFormInput placeholder="ИНН" value={account.tin} label="TIN" name="tin" onChange={onInputChange} />
                        <LoginFormInput placeholder="0000 000000" value={account.passport} label="Passport" name="passport" onChange={onInputChange} />

                        <div className='flex justify-between'>
                            <Button buttonText="Go back" onClick={() => setFirstStep(true)} isSecondOrder={true} />
                            <Button buttonText="Register" onClick={HandleRegister} extraStyles="ml-5" />
                        </div>
                    </div>}

            </div>
        </div>
    )
}
