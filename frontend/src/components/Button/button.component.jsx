import React from 'react'

export default function Button(props)
{
  const {buttonText, onClick, isSecondOrder=false, extraStyles="", type="button"} = props
  return (
  <button className={`${isSecondOrder===false ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-900/70'} text-white px-4 rounded-2xl w-full ${extraStyles} py-4 font-semibold uppercase text-m`} onClick={onClick} type={type}>
        {buttonText}
        <div>
          {props.children}
        </div>
    </button>
  )
}
