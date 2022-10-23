import React from 'react'
import ButtonMore from '../../ButtonMore/buttonMore.component'
import Icon from '../../Icon'

export default function TotalTasks(props) {
    const {totalNum} = props
    
    return (
        <div className="relative min-w-fit h-44 w-1/3 border-solid border p-6  border-slate-300/10 hover:border-slate-50/10 bg-gray-900/40 ackdrop-blur-sm rounded-2xl flex flex-wrap">
            <h3 className='text-white text-lg font-bold w-10/12'>
                Total tasks
            </h3>
            <ButtonMore/>
            <span className='text-white text-5xl font-extrabold mb-12 leading-snug'>
                {totalNum}  
            </span>
            <img className="absolute bottom-0 right-0" src="svg/task-img.svg" alt="task img">
            </img>
        </div>
    )
}
