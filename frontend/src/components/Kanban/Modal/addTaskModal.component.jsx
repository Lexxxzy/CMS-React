import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import Dropdown from '../../Dropdown'
import OutsideClickHandler from "react-outside-click-handler";
import { addTask, getContractIds, getEmployeesNames, getRepresentativesNames } from '../../../calls/cmsCalls';
import DropdownWithObj from '../../DropdownWithObj';
import { useDispatch, useSelector } from 'react-redux';

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

const getPriority = (priority) => {
    switch (priority) {
        case 'Low':
            return "0"
        case 'Medium':
            return "010"
        case 'High':
            return "100"
        default:
            return "0"
    }
}

function AddTaskModal(props) {
    const { title, snackbarRef, setErrorAddTask,errorAddTask, buttonText = "More Info" } = props

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const [pending, setPending] = useState(false);
    const [representatives, setRepresentatives] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [contracts, setContracts] = useState([]);
    
    const priorities = ["Low", "Medium", "High"];

    
    const { tasks } = useSelector((state) => state.tasks)

    useEffect(() => {
        const firstField = document.querySelector("input[name=field-0]");

        getRepresentativesNames(setPending, setRepresentatives);
        getEmployeesNames(setPending, setEmployees);
        getContractIds(setPending, setContracts);

        if (firstField != null) {
            firstField.focus()
        }

        selectRepresentative(representatives[0])
        selectEmployee(employees[0])
        selectContract(contracts[0])
    }, [visible])

    const [selectedRepresentative, selectRepresentative] = useState(representatives[0]);
    const [selectedEmployee, selectEmployee] = useState(employees[0]);
    const [selectedContract, selectContract] = useState(contracts[0]);
    const [selectedPriority, selectPriority] = useState(priorities[0]);
    const [taskTitle, setTaskTitle] = useState("")
    const [deadLine, setDeadline] = useState("")

    const handleAddTask = async () => {
        
        const task = {
            "representative": selectedRepresentative.tin,
            "executor": selectedEmployee.passport,
            contract: selectedContract,
            priority: getPriority(selectedPriority),
            "title": taskTitle,
            "to_date": deadLine,
            "task_status": false
        }
        const isAdded = await addTask(task, setErrorAddTask, dispatch);

        snackbarRef.current.show();

        if (isAdded === true){
            setVisible(false)
        }
    }

    const handleKeyUpDate = (e) => {
        setDeadline((...prev) => e.target.value)

        if (e.key !== "Backspace") {
          var num = e.target.value.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
          if (i >= 1) num.splice(2, 0, '.');
          if (i >= 3) num.splice(5, 0, '.');
          e.target.value = num.join('');
        }
    
      }

    return (

        <React.Fragment>
            <Button onClick={() => setVisible(true)} color="transparent">
                <div className='-mb-4'>
                    {buttonText}
                </div>
            </Button>
            <Modal

                show={visible}
                onClose={() => setVisible(false)}
            >
                <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
                    <div className="bg-slate-900/10">

                        <Modal.Header>

                            {title.slice(0, title.length - 1)}

                        </Modal.Header>
                        <Modal.Body>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-6 gap-6">

                                    <div className="col-span-6 sm:col-span-3" >
                                        <label
                                            htmlFor={`field-0`}
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Task title
                                        </label>
                                        <input
                                            type="text"
                                            name={`field-0`}
                                            id={`${title}`}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600/30 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter desired task title"
                                            onKeyDown={handleNext}
                                            value={taskTitle}
                                            onChange={(e) => setTaskTitle(e.target.value)}
                                            required="" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3" >
                                        <label
                                            htmlFor={`field-1`}
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Deadline
                                        </label>
                                        <input
                                            type="text"
                                            name={`field-1`}
                                            id={`${title}`}
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600/30 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="DD.MM.YYYY"
                                            onKeyDown={handleNext}
                                            value={deadLine}
                                            onChange={handleKeyUpDate}
                                            maxLength={10}
                                            required="" />
                                    </div>

                                    <div className='col-span-6 sm:col-span-3'>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Representative
                                        </label>
                                        {pending === false && representatives.length !==0 && selectedRepresentative!=null && 
                                            <DropdownWithObj
                                            isTask={true}
                                            options={representatives}
                                            objKey="full_name"
                                            secondObjKey="org_title"
                                            value={selectedRepresentative}
                                            setValue={selectRepresentative}
                                        />}
                                    </div>

                                    <div className='col-span-6 sm:col-span-3'>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Executor
                                        </label>
                                        {pending === false && employees.length !==0 && selectedEmployee!=null && 
                                            <DropdownWithObj
                                            isTask={true}
                                            options={employees}
                                            objKey="full_name"
                                            value={selectedEmployee}
                                            setValue={selectEmployee}
                                        />}
                                    </div>

                                    <div className='col-span-6 sm:col-span-3'>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Contract №
                                        </label>
                                        {pending === false && <Dropdown
                                            isTask={true}
                                            options={contracts}
                                            value={selectedContract}
                                            setValue={selectContract}
                                        />}
                                    </div>

                                    <div className='col-span-6 sm:col-span-3'>
                                        <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Priority
                                        </label>
                                        <Dropdown
                                            isTask={true}
                                            options={priorities}
                                            value={selectedPriority}
                                            setValue={selectPriority}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <div className='flex justify-center items-center '>
                            <Modal.Footer>
                                <Button onClick={handleAddTask} disabled={(taskTitle===null || taskTitle?.length < 3 || 
                                                                           taskTitle===undefined  || deadLine===null || 
                                                                           deadLine?.length !==10) ? true : false}>
                                    <div>Save all</div>
                                </Button>

                            </Modal.Footer>
                        </div>
                    </div>
                </OutsideClickHandler>
            </Modal>

        </React.Fragment>

    );
}

export default AddTaskModal;