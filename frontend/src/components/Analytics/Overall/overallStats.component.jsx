import React from 'react'
import Icon from '../../Icon'

export default function OverallStats(props) {
    const {employees, customers, done, inProgress} = props
    return (
        <div className="mb-10 min-w-fit h-44 w-3/5 border-solid border p-6 pl-6  border-slate-300/10 hover:border-slate-50/10 bg-gray-900/40 ackdrop-blur-sm rounded-2xl flex flex-wrap pr-0">
            <div className='flex flex-col w-1/5  border-solid border-r border-slate-500/60'>
                <Icon name="employee-blue" className='mb-4' size={48} />
                <h3 className='text-white font-extrabold text-2xl leading-snug'>{employees}</h3>
                <span className='text-slate-400 font-semibold text-s'>Employees</span>
            </div>

            <div className='flex flex-col w-1/5 ml-8 border-solid border-r border-slate-500/60'>
                <Icon name="card" className='mb-4' size={48} />
                <h3 className='text-white font-extrabold text-2xl leading-snug'>{customers}</h3>
                <span className='text-slate-400 font-semibold text-s'>Customers</span>
            </div>

            <div className='flex flex-col w-1/5 ml-8 border-solid border-r border-slate-500/60'>
                <Icon name="success" className='mb-2.5' size={44} />
                <h3 className='text-white font-extrabold text-2xl leading-snug'>{done}</h3>
                <span className='text-slate-400 font-semibold text-s'>Done Tasks</span>
            </div>

            <div className='flex flex-col w-1/5 ml-8'>
                <Icon name="question" className='mb-2.5' size={44} />
                <h3 className='text-white font-extrabold text-2xl leading-snug'>{inProgress}</h3>
                <span className='text-slate-400 font-semibold text-s'>Tasks In progress</span>
            </div>
        </div>
    )
}
