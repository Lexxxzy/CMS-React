import React from 'react'
import Icon from '../Icon'

export default function ButtonMore() {
    return (
        <button type="button" className="text-slate-300 h-10 bg-slate-500/20 hover:bg-slate-200/10 hover:text-white focus:ring-2 focus:outline-none focus:bg-slate-500/10 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 ">
            <Icon className="py-2" name="more" size={20} />
            <span className="sr-only">More</span>
        </button>
    )
}
