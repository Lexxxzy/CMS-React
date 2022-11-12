import React from 'react'
import BreadCrumbs from '../Breadcrumbs/breadcrumbs.component'
import InputWithLabel from './InputWithLabel/inputWithLabel.component'

export default function Profile({ title }) {
    return (
        <div >
            <BreadCrumbs title={title} />
            <div className=''>
                <div className='min-w-fit w-1/2 border-solid border p-14 border-slate-300/10 hover:border-slate-50/10 bg-gray-900/50 ackdrop-blur-sm rounded-2xl flex flex-col'>
                    <div className='pb-10 text-center'>   
                        <h3 className='text-white font-bold text-xl'>Олег Алексеевич Самойлов</h3>
                        <span className='text-slate-400 font-medium text-s'>Samoiloff</span>
                    </div> 

                    <div className='flex flex-wrap justify-evenly'>
                        <InputWithLabel placeholder="Директор" label="Position" />
                        <InputWithLabel placeholder="oleg.samoilov@gmail.com" label="Email" />
                        <InputWithLabel placeholder="512435264536277" label="Tin" />
                        <InputWithLabel placeholder="3333 434433" label="Passport" />
                        <InputWithLabel placeholder="₽230 000" label="Salary" />
                        <InputWithLabel placeholder="43" label="Age" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
