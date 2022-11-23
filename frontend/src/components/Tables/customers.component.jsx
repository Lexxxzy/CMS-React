import React, { useEffect, useState } from 'react'
import EditModal from '../EditModalUser/editUserModal.component'
import Table from '../Table/table.component'
import cn from "classnames"
import { getCustomers, server } from '../../calls/cmsCalls'
import Loader from '../Loader'

export default function CustomersTable(props) {
    const { title } = props
    const customersColumns = ["title", "phone", "representative", "client", "city"]

    const formatPhoneNumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '');

        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
      
        if (match) {
          return '+7 ' + '(' + match[2] + ') ' + match[3] + '-' + match[4] + '-' + match[5]
        };
      
        return null
      };
      const [pending, setPending] = useState(null);
      const [customers, setCustomers] = useState();
  
    //   useEffect(() => {
    //         getCustomers(setPending, setCustomers); 
    //   }, [])

    const [query, setQuery] = useState("");


    useEffect(() => {

        if (query.length === 0 || query.length > 1) getCustomers(setPending, setCustomers, query);
    }, [query]);

    return (
        <Table title={title} query={setQuery}>
        {pending===false ?
            <table className="backdrop-blur-sm w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs font-normal text-light-gray uppercase">
                    <tr>
                        {customersColumns.map((columnTitle, index) => (

                            <th scope="col" className={cn("py-3 px-6", { ["py-0 pl-14"]: index === 0, })} key={index}>
                                {columnTitle}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody >
                    {
                        customers.map((info, index) => (
                            
                            <tr className="border-solid border-t w border-slate-300/20 hover:bg-gray-50/20 dark:hover:bg-gray-700/20" key={index}>
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-14 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                <div className="">
                                    <div className="text-base font-semibold">{info["org_title"]}</div>
                                    <div className="font-normal text-gray-400">
                                        {info["org_email"]}
                                    </div>
                                </div>
                                </th>
                                <td className="py-4 px-6 font-semibold text-white">{formatPhoneNumber(info["org_phone_number"])}</td>
                                <th
                                    scope="row"
                                    className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                                >

                                    <div className="text-base font-semibold">{info["representative"]}</div>

                                </th>
                                <td className={cn("py-4 px-6 font-medium", 
                                                   info["is_client"] === true ? 'text-green-400' : 'text-red-500')}>{info["is_client"] === true ? 'Yes' : 'Not'}</td>
                                <td className="py-4 px-6 font-semibold text-white">{info["city"]}</td>
                                <td className="py-4 px-6">
                                    <EditModal fields={Object.keys(info)} data={customers[index]} title={title}/>
                                </td>
                                
                            </tr>
                        ))
                    }

                </tbody>
            </table> : <Loader></Loader>}
        </Table>
    )
}
