import React from 'react'

export default function BreadCrumbs(props) {
    const { title } = props
  return (
        <div className="mb-8 text-white text-base font-semibold">
        <span className="text-slate-500 font-normal">{`Admin / `}</span>

        {`${title}`}

        <h3 className="pt-1.5 text-white font-semibold text-lg">
        {`${title}`}
        </h3>
  </div>
  )
}
