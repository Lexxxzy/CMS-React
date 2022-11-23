import React, { useEffect, useState } from 'react'
import { getAnalytics } from '../../calls/cmsCalls'
import BreadCrumbs from '../Breadcrumbs/breadcrumbs.component'
import Loader from '../Loader'
import MiniEmployeeTable from './Employees/miniEmployeeTable'
import OverallStats from './Overall/overallStats.component'
import RecentTasks from './Recent/recentTasks.component'
import TotalTasks from './Total/totalTasks.component'

const initial_state_analytics = {
    "overall_stats": [
      {
        "done_task_count": 0,
        "employee_count": 0,
        "in_progress_task_count": 0,
        "organization_count": 0,
        "task_count": 0
      }
    ],
    "recent_tasks": []
  }

export default function AnalyticsDashboard(props) {
    const { title, setActiveTab } = props
    const [pending, setPending] = useState(null);
    const [analytics, setAnalytics] = useState(initial_state_analytics);

    useEffect(() => {
        getAnalytics(setPending, setAnalytics); 
    }, [])

    return (
        <>{ pending === false ?
         <div className=" m-auto">
            <BreadCrumbs title={title} />
            <div className='flex flex-wrap justify-between min-w-fit'>
                <TotalTasks totalNum={analytics.overall_stats.task_count} />

                <OverallStats employees={analytics.overall_stats.employee_count} 
                              customers={analytics.overall_stats.organization_count} 
                              done={analytics.overall_stats.done_task_count} 
                              inProgress={analytics.overall_stats.in_progress_task_count} />

                <RecentTasks recentTasks={analytics.recent_tasks} setActiveTab={setActiveTab}/>

                {/* TODO: Employees mini table */}
                <MiniEmployeeTable title=""></MiniEmployeeTable>
            </div>
        </div> : <Loader></Loader>}
        </>
    )
}
