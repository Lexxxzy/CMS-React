import React from 'react'

export default function InputWithLabel(props) {
    const {label, placeholder, isRequired = false, isDisabled=true} = props
    return (
        <div className='flex flex-col pb-5 w-1/4 mr-5'>
            <label
                htmlFor="position"
                className="mb-2.5 block text-sm font-semibold text-gray-900 dark:text-slate-200"
            >
                {label}
            </label>
            <input

                type="text"
                name="position"
                id={placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-500/5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required={isRequired} 
                disabled={isDisabled}
                />
        </div>
    )
}
