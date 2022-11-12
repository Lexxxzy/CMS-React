import React from 'react'
import ButtonMore from '../../ButtonMore/buttonMore.component'
import Icon from '../../Icon'

export default function RecentTasks(props) {
    const {recentTasks} = props;
  return (
    <div className="max-h-[32rem] relative w-1/3 border-solid border p-6  border-slate-300/10 hover:border-slate-50/10 bg-gray-900/40 ackdrop-blur-sm rounded-2xl flex flex-wrap">
                    <div className='flex flex-wrap flex-row w-full'>
                        <div className='flex flex-col w-10/12'>
                            <h3 className='text-white text-lg font-bold leading-snug'>
                                Recent Tasks
                            </h3>
                            <span className='text-slate-400 text-xs font-normal'>
                                10 over the last week
                            </span>
                        </div>

                        <ButtonMore />
                    </div>

                    <div className='flex flex-wrap flex-row'>
                        {recentTasks.map((task,index) => (
                            <div className='flex flex-wrap flex-row pt-6' key={index}>
                                <Icon name={task.isReady ? "success" : "cross"} size={30} />
                                <div className='flex flex-wrap flex-col pl-4 pt-1'>
                                    <p className='font-semibold text-white text-s'>
                                        {task.title}
                                    </p>
                                    <span className='font-medium text-slate-500'>
                                        {task.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
  )
}
