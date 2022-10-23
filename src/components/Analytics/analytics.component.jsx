import React from 'react'
import BreadCrumbs from '../Breadcrumbs/breadcrumbs.component'
import ButtonMore from '../ButtonMore/buttonMore.component'
import Icon from '../Icon'
import ExployeeTable from '../Tables/employee.component'
import OverallStats from './Overall/overallStats.component'
import RecentTasks from './Recent/recentTasks.component'
import TotalTasks from './Total/totalTasks.component'

const tasks = [
        {
            isReady: true,
            title: "Проведение презентации",
            date: "22 DEC 7:20 PM"
        },
        {
            isReady: false,
            title: "Проведение презентации",
            date: "22 DEC 7:20 PM"
        },
        {
            isReady: true,
            title: "Проведение презентации",
            date: "22 DEC 7:20 PM"
        },
]


export default function AnalyticsDashboard(props) {
    const { title } = props

    return (
        <div className=" m-auto">
            <BreadCrumbs title={title} />

            <div className='flex flex-wrap justify-between min-w-fit'>
                <TotalTasks totalNum={385} />

                <OverallStats employees={30} customers={102} done={200} inProgress={15} />

                <RecentTasks recentTasks={tasks}/>

                {/* TODO: Employees mini table */}
            </div>
        </div>
    )
}
