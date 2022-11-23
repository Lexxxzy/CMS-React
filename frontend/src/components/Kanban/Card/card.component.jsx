import React, { useState } from 'react'
import cn from "classnames"

function Card({ task }) {
    const { title, from_date, to_date, priority, author, representative, executor, contract } = task

    return (
        <div className='p-7 dark:bg-slate-900/40 rounded-lg border border-solid border-slate-300/10 mb-5'>
            <div className='text-white font-bold text-lg p-4 text-left'>
                <h3 className='flex justify-items-left align-middle content-center leading-4'>
                    <span className='mt-4'>{title.slice(0, 20)} {title.length > 17 && "..."}</span>
                    <button className={cn("ml-3 mt-4 w-4 h-4 rounded-full bg-transparent border-4 border-solid  text-white",
                        priority === "0" && "border-green-400", (priority === "1" || priority === "010") && "border-orange-400", priority === "100" && "border-red-500")} />
                </h3>
                <div className='mt-1 pt-0'>
                    <span className='text-green-400/75 text-xs font-medium'>
                        From: {`${from_date}  `} <span className='text-slate-500'>—</span>
                    </span>
                    <span className='text-red-500/75 text-xs font-medium'>
                        {` To: ${to_date}`}
                    </span>
                </div>

                <div className='flex flex-wrap text-s mt-5'>
                    <div className='w-1/2'>
                        <h5>Author</h5>
                        <div className='text-m text-slate-400 font-medium'>{author}</div>
                    </div>

                    <div className='w-2/5 pl-5 mb-5 '>
                        <h5>Executor</h5>
                        <div className='text-m text-slate-400 font-medium'>{executor}</div>
                    </div>

                    <div className='w-1/2'>
                        <h5>Representative</h5>
                        <div className='text-m text-slate-400 font-medium'>{representative}</div>
                    </div>

                    <div className='w-2/5 pl-5'>
                        <h5>Contract</h5>
                        <div className='text-m text-slate-400 font-medium'>{contract===null ? "No" : `#${contract}`}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card