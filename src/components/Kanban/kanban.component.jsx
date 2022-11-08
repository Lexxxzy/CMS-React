import React, { useState } from 'react'
import BreadCrumbs from '../Breadcrumbs/breadcrumbs.component'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Card from './Card/card.component'
import './kanban.styles.sass'
import cn from "classnames"
import EditUserModal from '../EditModalUser/editUserModal.component'
import { Button } from 'flowbite-react'

const mockData= [
  {
    id: "1",
    title: 'In progress',
    tasks: [
      {
        id: "1",
        title: 'Телефонный звонок',
        from_date: '25.09.2022',
        to_date: '30.09.2022',
        author: 'Герасимов А.А.',
        representative: 'Смирнов В.В.',
        executor: 'Иванов А.Ф.',
        contract: '#1343245',
        priority: 1
      },
      {
        id: "2",
        title: 'Отправка e-mail о послегарантийном ремонте',
        from_date: '25.09.2022',
        to_date: '30.09.2022',
        author: 'Герасимов А.А.',
        representative: 'Смирнов В.В.',
        executor: 'Иванов А.Ф.',
        contract: '#1343245',
        priority: 2
      }
    ]
  },
  {
    id: "2",
    title: 'Done',
    tasks: [
      {
        id: "3",
        title: 'Телефонный звонок',
        from_date: '25.09.2022',
        to_date: '30.09.2022',
        author: 'Герасимов А.А.',
        representative: 'Смирнов В.В.',
        executor: 'Иванов А.Ф.',
        contract: '#1343245',
        priority: 1
      },
      {
        id: "4",
        title: 'Отправка e-mail о послегарантийном ремонте',
        from_date: '25.09.2022',
        to_date: '30.09.2022',
        author: 'Герасимов А.А.',
        representative: 'Смирнов В.В.',
        executor: 'Иванов А.Ф.',
        contract: '#1343245',
        priority: 2
      }
    ]
  }
]
function Kanban({ title }) {
  const [data, setData] = useState(mockData)

  const onDragEnd = result => {
    if(!result.destination) return
    
    const {source, destination} = result

    if (source.droppableId !== destination.droppableId) 
    {
      const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
      const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

      const sourceCol = data[sourceColIndex]
      const destinationCol = data[destinationColIndex]

      const sourceTask = [...sourceCol.tasks]
      const destinationTask = [...destinationCol.tasks]

      const [removed] = sourceTask.splice(source.index,1)
      destinationTask.splice(destination.index,0,removed)

      data[sourceColIndex].tasks = sourceTask
      data[destinationColIndex].tasks = destinationTask

      setData(data)
    }
  }

  return (
    <div className=" m-auto">
      <BreadCrumbs title={title} />
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
                data.map(section => (
                  <Droppable
                    key={section.id}
                    droppableId={section.id}
                  >
                    {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className='p-10 bg-slate-900/20 rounded-2xl first:mr-20 h-fit w-1/2 border-slate-300/10 border-solid border'
                        >
                          <div className ='text-white font-bold text-xl p-4 text-left mb-5'>
                            <h3 className=''>
                            {section.title}
                            <button className={cn("absolute mt-2.5 ml-3 w-4 h-4 rounded-full bg-transparent border-4 border-solid text-white", 
                                                  section.title === "Done" ? "border-green-400" : "border-red-500")}/>
                            </h3>
                            <span className='text-slate-500 text-s font-medium'>
                              Overall — {section.tasks.length} {section.tasks.length===1 ? "task" : "tasks"}
                            </span>
                          </div>
                          <div className='kanban__section__content'>
                            {section.tasks.map((task, index) => (
                                <Draggable
                                  key={task.id}
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
                          <Button color="transparent">
                          <span className='text-slate-500 underline'>
                            Add task
                            </span>
                            </Button>
                          {provided.placeholder}
                        </div>
                      )}
                  </Droppable>
                ))
              }
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

export default Kanban