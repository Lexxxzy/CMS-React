import React from 'react'

export default function Button({buttonText, onClick}) {
  return (
    <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-2xl w-full py-4 font-semibold uppercase text-m' onClick={onClick}>
        {buttonText}
    </button>
  )
}
