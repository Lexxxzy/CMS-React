import React, { useEffect, useState} from 'react';
import { Modal } from 'flowbite-react';
import OutsideClickHandler from "react-outside-click-handler";
import { getReport } from '../../calls/cmsCalls';
    
function ReportModal({passport}) {
    const [visible, setVisible] = React.useState(false);
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [report, setReport] = useState(null)
    const fields = ["employee_name", "expired_tasks", "not_completed", "on_time", "overdue", "total_tasks"]

    useEffect(() => {
        const firstField = document.querySelector("input[name=field-0]")
        if (firstField != null) {
            firstField.focus()
        }
    }, [visible])


    const handleNext = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            const { name } = e.target;
            const [_, fieldIndex] = name.split("-");
            let fieldIntIndex = parseInt(fieldIndex, 10);

            const nextfield = document.querySelector(
                e.key === "ArrowLeft" ? `input[name=field-${fieldIntIndex - 1}]`
                    : `input[name=field-${fieldIntIndex + 1}]`
            );

            if (nextfield !== null) {
                nextfield.focus();
            }
        }

    }

    const handleKeyUpDate = (e, isFrom) => {
        if (isFrom===true)
        {
            setFromDate((...prev) => e.target.value)
        } else {
            setToDate((...prev) => e.target.value)
        }

        if (e.key !== "Backspace") {
          var num = e.target.value.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
          if (i >= 3) num.splice(4, 0, '.');
          if (i >= 5) num.splice(7, 0, '.');
          e.target.value = num.join('');
        }
    
      }

    const makeReport = () => {
        console.log(fromDate, toDate, passport)
        getReport(fromDate, toDate, passport, setReport)
        //setVisible(false)
    }



    return (
        
        <React.Fragment>
        <button onClick={() => setVisible(true)} type="button" className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
            <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path></svg>
            Make report
        </button>
            <Modal
                
                show={visible}
                onClose={() => setVisible(false)}
            >
            <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
                <div className="bg-slate-900/10">

                    <Modal.Header>
                    
                        {report===null ? 'Employee report' : `Report for ${report['employee_name']}`}
                        
                    </Modal.Header>
                    <Modal.Body>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3" >
                                        <label
                                            htmlFor={`field-0`}
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            From date
                                        </label>
                                        <input
                                            type="text"
                                            name={`field-0`}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600/30 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={"YYYY.DD.MM"}
                                            onKeyDown={handleNext}
                                            value={fromDate}
                                            maxLength={10}
                                            onChange={(e) => handleKeyUpDate(e, true)}
                                            required="" />
                                </div>
                                    
                                 <div className="col-span-6 sm:col-span-3" >
                                        <label
                                            htmlFor={`field-1`}
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            { "To date"}
                                        </label>
                                        <input
                                            type="text"
                                            name={`field-1`}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600/30 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={'YYYY.DD.MM'}
                                            onKeyDown={handleNext}
                                            onChange={(e) => handleKeyUpDate(e, false)}
                                            value={toDate}
                                            maxLength={10}
                                            required="" />
                                </div>
                                
                                {report!==null && 
                                    <>
                                    {
                                        fields.map((field) => (
                                            <div className="col-span-6 sm:col-span-3" key={field}>
                                                <label
                                                    htmlFor={`field-${field}`}
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                { field.charAt(0).toUpperCase() +  field.slice(1).replaceAll('_', ' ')}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`field-${{field}}`}
                                                    id={`${{field}}`}
                                                    disabled={true}
                                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600/30 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder={report[field]?.toString()}
                                                    onKeyDown={handleNext}
                                                    required="" 
                                                    />
                                            </div>
                                        ))
                                    }
                                    </>}
                            </div>
                        </div>
                    </Modal.Body>
                    <div className='flex justify-center items-center '>
                        <Modal.Footer>
                                {report === null?
                                    <button onClick={makeReport} type="button" className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                                        <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688">
                                        </path>
                                        </svg>
                                        Get report
                                    </button> :
                                    <button onClick={() => setVisible(false)} type="button" className="text-white bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                                    <svg aria-hidden="true" className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                    </svg>
                                    Close
                                </button>
                                }
                           
                        </Modal.Footer>
                    </div>
                </div>
                </OutsideClickHandler>
            </Modal>
            
        </React.Fragment>
        
    );
}

export default ReportModal;