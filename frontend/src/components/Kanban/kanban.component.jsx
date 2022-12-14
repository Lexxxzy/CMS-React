import React, { useEffect, useRef, useState } from 'react'
import BreadCrumbs from '../Breadcrumbs/breadcrumbs.component'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Card from './Card/card.component'
import './kanban.styles.sass'
import cn from "classnames"
import EditModal from '../EditModalUser/editUserModal.component'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks, updateTaskStatus } from '../../calls/cmsCalls'
import Loader from '../Loader'
import { swapTasks } from '../../data/tasksSlice'
import AddTaskModal from './Modal/addTaskModal.component'
import Snackbar, { SnackbarType } from '../Snackbar'
import { getUserRole } from '../../calls/authCalls'
const taskRows = ["Task title","Deadline","Representative","Executor","Contract","Priority"];

function Kanban({ title }) {
  const dispatchAction = useDispatch();
  const { tasks, pending, error, errorText } = useSelector((state) => state.tasks)
  const [errorAddTask, setErrorAddTask] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => { 
    getTasks(dispatchAction);
    getUserRole(setUserRole);
   }, []);

   const snackbarRef = useRef(null);

  const onDragEnd = result => {
    if(!result.destination) return
    
    const {source, destination} = result

    if (source.droppableId !== destination.droppableId) 
    {
      const sourceColIndex = tasks.findIndex(e => e.id === source.droppableId)
      const destinationColIndex = tasks.findIndex(e => e.id === destination.droppableId)

      const sourceCol = tasks[sourceColIndex]
      const destinationCol = tasks[destinationColIndex]

      const sourceTask = [...sourceCol.tasks]
      const destinationTask = [...destinationCol.tasks]

      const [removed] = sourceTask.splice(source.index,1)
      destinationTask.splice(destination.index,0,removed)

      updateTaskStatus(result.draggableId)

      dispatchAction(swapTasks({
        sourceTasks: sourceTask,
        sourceColIndex: sourceColIndex,
        destinationTasks: destinationTask,
        destinationColIndex: destinationColIndex,
      }))
    }
  }

  return (
    <div className=" m-auto">
      <BreadCrumbs title={title} />
      {pending===false && tasks.length === 2 ?  
      <div className="">

        <div className="flex justify-between items-center">
          <div>
            <h2
              className="font-bold text-2xl pb-6 dark:text-white"
            >
              {title}
            </h2>
          </div>
        </div>

        <div className="relative mr-10">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className='flex flex-row justify-center'>
              {
                tasks.map(section => (
                  <Droppable
                    key={section.id}
                    droppableId={section.id}
                  >
                    {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className='mb-10 p-10 bg-slate-900/20 rounded-2xl first:mr-20 w-1/2 max-h-[54rem] border-slate-300/10 border-solid border'
                        >
                          <div className ='text-white font-bold text-xl p-4 text-left mb-5'>
                            <h3 className=''>
                            {section.title}
                            <button className={cn("absolute mt-2.5 ml-3 w-4 h-4 rounded-full bg-transparent border-4 border-solid text-white", 
                                                  section.title === "Done" ? "border-green-400" : "border-red-500")}/>
                            </h3>
                            <span className='text-slate-500 text-s font-medium'>
                              Overall ??? {section.tasks.length} {section.tasks.length===1 ? "task" : "tasks"}
                            </span>
                          </div>
                          <div className='overflow-y-auto h-[39.5rem] kanban__section__content'>
                            {section.tasks.map((task, index) => (
                                <Draggable
                                  key={(task.id).toString()}
                                  draggableId={task.id}
                                  index={index}>
                                  {(provided, snapshot) => {
                                   return(
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                      }}>
                                      <Card task={task}>
                                        {task.title}
                                        
                                      </Card>
                                      {provided.placeholder}
                                    </div>
                                  )}}
                                  
                                </Draggable>
                              ))}
                          </div>
                          <div className='text-slate-500 underline '>
                          {userRole!==null && userRole!=="employee" && <AddTaskModal fields={taskRows} options={["s","s"]} selectedRepresentative="sdsa" setRepresentative={() => "s"} title="Add taskk" buttonText="Add task" snackbarRef={snackbarRef} setErrorAddTask={setErrorAddTask} errorAddTask={errorAddTask}/>}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                  </Droppable>
                ))
              }
            </div>
          </DragDropContext>
        </div>
      </div> : <Loader></Loader>}
      {errorAddTask===false ?
      <Snackbar
      ref={snackbarRef}
      message="Task was added"
      type={SnackbarType.success}
    /> :
      <Snackbar
      ref={snackbarRef}
      message="Incorrect input"
      type={SnackbarType.error}
    />
      }
    </div>
  )
}

export default Kanban