import React, { useEffect } from 'react'
import EditUserModal from '../EditModalUser/editUserModal.component'
import Table from '../Table/table.component'
import cn from "classnames"
import { useDispatch, useSelector } from 'react-redux'
import { getRepresentatives } from '../../calls/cmsCalls'
import Loader from '../Loader'

export default function RepresentativesTable(props) {
    const { title } = props
    const employeeColumns = ["name", "company", "position", "phone"]

    const formatPhoneNumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '');

        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
      
        if (match) {
          return '+7 ' + '(' + match[2] + ') ' + match[3] + '-' + match[4] + '-' + match[5]
        };
      
        return null
      };

      const dispatchAction = useDispatch();
      useEffect(() => { 
          getRepresentatives(dispatchAction);
         }, []);
  
      const { representatives, pending } = useSelector((state) => state.representatives);

    return (
         <Table title={title}>
         {pending===false ?
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
                        representatives.map((info, index) => (
                            
                            <tr className="border-solid border-t w border-slate-300/20 hover:bg-gray-50/20 dark:hover:bg-gray-700/20" key={index}>
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-14 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                <div className="">
                                    <div className="text-base font-semibold">{info["name"]} {info["middle_name"]} {info["surname"]}</div>
                                    <div className="font-normal text-gray-400">
                                        {info["email"]}
                                    </div>
                                </div>
                                </th>
                                <td className="py-4 px-6 font-semibold text-white">{info["organization"]}</td>
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                                >

                                    <div className="text-base font-semibold">{info["position"]}</div>

                                </th>
                                <td className="py-4 px-6 font-medium text-white">{formatPhoneNumber(info["phone"])}</td>
                                <td className="py-4 px-6">
                                    <EditUserModal fields={Object.keys(info)} data={representatives[index]} title={title}/>
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
                <div className="text-base font-semibold">???????????????????? ??????????????????????</div>
                <div className="font-normal text-gray-400">
                ?????????????????? ??????
                </div>
            </div>
            </th>
            <td className="py-4 px-6 font-semibold text-white">???????? ??????????????</td>
            <th
            scope="row"
            className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
            <div className="">
                <div className="text-base font-semibold">????????????</div>
                <div className="font-normal text-gray-400">
                ???????? ??????????????????
                </div>
            </div>
            </th>
            <td className="py-4 px-6 font-medium text-gray-400">21 DEC 9:28 PM</td>
            <td className="py-4 px-6 font-medium text-green-400">????????????</td>
            <td className="py-4 px-6">

            <EditUserModal fields={columns}/>
            </td>
            </tr>*/}

                </tbody>
            </table> : <Loader></Loader>}
        </Table>
    )
}
