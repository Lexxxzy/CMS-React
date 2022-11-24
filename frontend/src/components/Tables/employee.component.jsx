import React, { useEffect } from 'react'
import EditUserModal from '../EditModalUser/editUserModal.component'
import Table from '../Table/table.component'
import cn from "classnames"
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../../calls/cmsCalls'
import Loader from '../Loader'

export default function EmployeeTable(props) {
    const { title } = props
    const employeeColumns = ["employee", "login", "position", "passport", "salary"]

    const dispatchAction = useDispatch();
    useEffect(() => { 
        getEmployees(dispatchAction);
       }, []);

    const { employees, pending } = useSelector((state) => state.employees);

    return (
        <Table title={title}>
        {pending === false ? 
            <table className="backdrop-blur-sm w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs font-normal text-light-gray uppercase">
                    <tr>
                        {employeeColumns.map((columnTitle, index) => (

                            <th scope="col" className={cn("py-3 px-6", { ["py-0 pl-14"]: index === 0, })} key={index}>
                                {columnTitle}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody >
                    {
                        employees.map((info, index) => (
                            
                            <tr className="border-solid border-t w border-slate-300/20 hover:bg-gray-50/20 dark:hover:bg-gray-700/20" key={index}>
                                <th
                                    scope="row"
                                    className="flex items-center py-6 px-14 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                <div className="">
                                    <div className="text-base font-semibold">{info["surname"]} {info["name"].charAt(0)}. {info["middle_name"].charAt(0)}.</div>
                                    <div className="font-normal text-gray-400">
                                        {info["email"]}
                                    </div>
                                </div>
                                </th>
                                <td className="py-4 px-6 font-semibold text-white">{info["login"]}</td>
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                                >

                                    <div className="text-base font-semibold">{info["position"]}</div>

                                </th>
                                <td className="py-4 px-6 font-medium text-gray-400">{info["passport"]}</td>
                                <td className={`py-4 px-6 font-medium ${info["salary"]===null ? 'text-red-400' : 'text-green-400'}`}>{info["salary"]===null ? "Not set" : `₽${info["salary"]}`}</td>
                                <td className="py-1 px-6">
                                    <EditUserModal fields={Object.keys(info)} data={employees[index]} title={title} secondButton={true}/>
                                </td>
                                
                            </tr>
                        ))
                    }
                    {/*<tr className=" hover:bg-gray-50 dark:hover:bg-gray-700/30">
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

            <EditUserModal fields={columns}/>
            </td>
            </tr>*/}

                </tbody>
            </table> : <Loader></Loader>}
        </Table>
    )
}
