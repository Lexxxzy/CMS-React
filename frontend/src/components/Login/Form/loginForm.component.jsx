import React from 'react'

export default function LoginFormInput(props) {
  
    const {label, placeholder,value="", name="", onChange,isRequired = true, isDisabled=false, extraStyles="", errorBorder, type='text'} = props

    return (
    <div className={`flex flex-col pb-5 ${extraStyles}`}>
        <label
            htmlFor={name}
            className="mb-2.5 pl-2 block text-s font-bold text-gray-900 dark:text-slate-200"
        >
            {label}
        </label>
        <input

            type={type}
            name={name}
            id={placeholder}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-2xl focus:ring-slate-700 focus:border-slate-700 block w-full p-3 dark:bg-slate-800/50  dark:placeholder-gray-400 dark:text-white  ${errorBorder && 'border border-solid border-red-500 dark:border-red-500'}`}
            placeholder={placeholder}
            required={isRequired} 
            disabled={isDisabled}
            onChange={onChange}
            value={value}
            />
    </div>
  )
}
