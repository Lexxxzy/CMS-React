import './App.css';
import * as React from 'react';
import EditUserModal from './components/tables/editUserModal.component';



function App() {
  return (
    <div className="pt-96 pb-96 m-auto w-3/5">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg dark:bg-gray-800/30">
        <div className="ackdrop-blur-sm flex justify-between items-center py-4 ">
          <div>
            <h2
              className="font-bold text-xl px-14 py-6 dark:text-white"
            >
              Employees
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
              placeholder="Search for employees"
            />
          </div>
        </div>
        <table className="backdrop-blur-sm w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs font-normal text-light-gray uppercase">
            <tr>
              <th scope="col" className="py-3 px-14">
                Info
              </th>
              <th scope="col" className="py-3 px-6">
                Executor
              </th>
              <th scope="col" className="py-3 px-6">
                Organization
              </th>
              <th scope="col" className="py-3 px-6">
                Creation Date
              </th>
              <th scope="col" className="py-3 px-6">
                Task status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <th
                scope="row"
                className="flex items-center py-4 px-14 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="">
                  <div className="text-base font-semibold">Проведение презентации</div>
                  <div className="font-normal text-gray-400">
                    Контракта нет
                  </div>
                </div>
              </th>
              <td className="py-4 px-6 font-semibold text-white">Инна Дубкова</td>
              <th
                scope="row"
                className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="">
                  <div className="text-base font-semibold">Нортон</div>
                  <div className="font-normal text-gray-400">
                  Петр Белозеров
                  </div>
                </div>
              </th>
              <td className="py-4 px-6 font-medium text-gray-400">21 DEC 9:28 PM</td>
              <td className="py-4 px-6 font-medium text-green-400">Готово</td>
              <td className="py-4 px-6">
                {/* Modal toggle */}
                <EditUserModal />
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
