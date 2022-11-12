import React from 'react';
import BreadCrumbs from '../Breadcrumbs/breadcrumbs.component';

export default function Table(props) {
  const { title } = props
  return (
    <div className=" m-auto">
      <BreadCrumbs title={title} />
      <div className="border-solid border border-slate-300/10 hover:border-slate-50/10 overflow-x-auto relative shadow-md sm:rounded-lg dark:bg-gray-900/40">

        <div className="flex justify-between items-center py-4">
          <div>
            <h2
              className="font-bold text-xl px-14 py-6 dark:text-white"
            >
              {title}
            </h2>

          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mr-10">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:blue-gray"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block pl-10 w-52 text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-900/30 dark:border-gray-500/50 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Search for ${title.toLowerCase()}`}
            />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}
