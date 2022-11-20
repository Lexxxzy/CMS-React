import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../calls/cmsCalls';
import BreadCrumbs from '../Breadcrumbs/breadcrumbs.component'
import InputWithLabel from './InputWithLabel/inputWithLabel.component'

export default function Profile({ title }) {
    const dispatchAction = useDispatch();
    useEffect(() => { 
        getUserInfo(dispatchAction);
       }, []);

    const { userInfo } = useSelector((state) => state.user);
    return (
        <div >
            <BreadCrumbs title={title} />
            <div className=''>
                <div className='min-w-fit w-1/2 border-solid border p-14 border-slate-300/10 hover:border-slate-50/10 bg-gray-900/50 ackdrop-blur-sm rounded-2xl flex flex-col'>
                    <div className='pb-10 text-center'>   
                        <h3 className='text-white font-bold text-xl'>{userInfo.full_name}</h3>
                        <span className='text-slate-400 font-medium text-s'>{`@${userInfo.login}`}</span>
                    </div> 

                    <div className='flex flex-wrap justify-evenly'>
                        <InputWithLabel placeholder={userInfo.position} label="Position" />
                        <InputWithLabel placeholder={userInfo.email} label="Email" />
                        <InputWithLabel placeholder={userInfo.tin} label="Tin" />
                        <InputWithLabel placeholder={userInfo.passport} label="Passport" />
                        <InputWithLabel placeholder={userInfo.salary} label="Salary" />
                        <InputWithLabel placeholder={userInfo.age} label="Age" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
