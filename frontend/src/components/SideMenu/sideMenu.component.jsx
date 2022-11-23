import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./sideMenu.styles.sass";
import Icon from "../../components/Icon";
import Dropdown from "../../components/Dropdown";
import Table from "../Table/table.component";
import EmployeeTable from "../Tables/employee.component";
import AnalyticsDashboard from "../Analytics/analytics.component";
import Profile from "../Profile/profile.component";
import { Navigate, useNavigate } from "react-router-dom";
import CustomersTable from "../Tables/customers.component";
import RepresentativesTable from "../Tables/representatives.component";
import Kanban from "../Kanban/kanban.component";
import { useDispatch, useSelector } from "react-redux";
import { getTables } from "../../calls/authCalls";
import Loader from "../Loader";

const SideMenu = () => {
  const dispatchAction = useDispatch();
  const { availibleTables, pending, error } = useSelector((state) => state.user);

  const options = [];
  availibleTables.map((subarray) =>(
    subarray.titles.map((subtitle) => (options.push(subtitle.title)))
  ))
  
  var [activeTab, setActiveTab] = useState("Tasks");
  
  const navigate = useNavigate()

  const signOut = () => {
    navigate("/login")
  }

  const handleClick = (x) => {
    setActiveTab(x.title);
  };

  useEffect(() => { 
    getTables(dispatchAction);
    setActiveTab("Tasks")
   }, []);

  return (
    <>
    { pending===false && availibleTables.length === 2 ? (
      
    <div className={cn("section", styles.section,)}>
      <div className={cn("container", styles.container)}>
        <Dropdown
          className={cn("tablet-show", styles.dropdown)}
          options={options}
          value={activeTab}
          setValue={setActiveTab}
        />

        <div className="border-solid border border-slate-300/10 hover:border-slate-50/10 bg-gray-900/60 backdrop-blur-sm w-72 flex flex-col shrink-0 items-start justify-between p-12 pb-0 pr-8 rounded-3xl mr-36">
          <div className="font-bold m-auto pb-6 text-center tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-300 to-gray-900">
            {availibleTables[0].head} PANEL
          </div>
          <div className="h-px w-full bg-slate-600 mb-6">
          </div>
          {availibleTables.map((subarray, index) => (
            <div key={index} className="last: mb-4">
              <h3 className="text-white mb-4 pr-5 rounded-xl font-semibold uppercase text-xs" key={index}>
              
                {subarray.sub}
                
              </h3>

              {
                subarray.titles.map((subtitle, index) =>(
                  <button
                    className={cn("w-full flex items-center text-white mb-2 p-4 pr-20 rounded-xl font-semibold", {
                      ["bg-slate-50/5"]: subtitle.title === activeTab,
                    })}
                    onClick={() => handleClick(subtitle, index)}
                    key={index}
                  >
                    <Icon className="mr-5 fill-white" name={subtitle.icon} size="16" />
                    {subtitle.title}
                  </button>
                ))}
              </div>
          ))}
          <div className="pt-10">


          </div>
        </div>
        <div className="w-full pr-32">
          
            {activeTab === "Analytics" && <AnalyticsDashboard title={activeTab} setActiveTab={setActiveTab}/>}
            {activeTab === "Tasks" && <Kanban title={activeTab}/>}
            {activeTab === "Customers" && <CustomersTable title={activeTab}/>}
            {activeTab === "Representatives" && <RepresentativesTable title={activeTab} />}
            {activeTab === "Contracts" && <Table title={activeTab} />}
            {activeTab === "Employees" && <EmployeeTable title={activeTab} />}
            {activeTab === "Profile" && <Profile title={activeTab}/>}
            {activeTab === "Sign Out" && <Navigate to="/login"/>}
           
        </div>
        </div>
    </div>) : <Loader></Loader> }
    </>           
  );
};

export default SideMenu;
