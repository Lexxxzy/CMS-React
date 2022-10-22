import React, { useState } from "react";
import cn from "classnames";
import styles from "./sideMenu.styles.sass";
import Icon from "../../components/Icon";
import Dropdown from "../../components/Dropdown";
import Table from "../Table/table.component";
import ExployeeTable from "../Tables/employee.component";

const items = [
  {
    sub: "tables",
    "titles": [
      {
        title: "Analytics",
        icon: "home",
      },
      {
        title: "Tasks",
        icon: "tasks",
      },
      {
        title: "Customers",
        icon: "cusomers",
      },
      {
        title: "Contracts",
        icon: "contracts",
      },
      {
        title: "Employees",
        icon: "employees",
      }
    ],
  },
  {
    sub: "account",
    "titles": [
      {
        title: "Profile",
        icon: "profile",
      },
      {
        title: "Sign Out",
        icon: "signout",
      },
    ],
  }
]

const dataEmployees = [
  {
    name: "Инна",
    "middle name": "Алексеевна",
    surname: "Дубкова",
    login: "idubkova",
    position: "Менеджер",
    email: "dubkova@wma.ru",
    passport: "3344 4343",
    tin: "343432432534",
    salary: "67,232"
  },
  {
    name: "Aнна",
    "middle name": "Алексеевна",
    surname: "Дубкова",
    login: "idubkova",
    position: "Менеджер",
    email: "dubkova@wma.ru",
    passport: "3344 4343",
    tin: "343432432534",
    salary: "67,232"
  }
]




const SideMenu = () => {
  const options = [];

  items.map((subarray) =>(//this block will map  [2,7], [13, 47], [55,77] as in their own arrays individually?
    subarray.titles.map((subtitle) => (options.push(subtitle.title)))
  )
  )

  const [activeTab, setActiveTab] = useState(options[0]);

  const handleClick = (x) => {
    setActiveTab(x.title);
  };

  return (

    <div className={cn("section", styles.section,)}>
      <div className={cn("container", styles.container)}>

        <Dropdown
          className={cn("tablet-show", styles.dropdown)}
          options={options}
          value={activeTab}
          setValue={setActiveTab}
        />

        <div className="border-solid border border-slate-300/10 hover:border-slate-50/10 bg-gray-900/60 ackdrop-blur-sm w-72 flex flex-col shrink-0 items-start justify-between p-12 pb-0 pr-8 rounded-3xl mr-36">
          <div className="font-bold m-auto pb-6 text-center tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-300 to-gray-900">
            ADMIN PANEL
          </div>
          <div className="h-px w-full bg-slate-600 mb-6">
          </div>
          {items.map((subarray, index) => (
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
          {activeTab === options[0] &&  <div/>}
          {activeTab === options[1] && <Table title={activeTab}/>}
          {activeTab === options[2] &&  <Table title={activeTab}/>}
          {activeTab === options[3] &&  <Table title={activeTab}/>}
          {activeTab === options[4] && <ExployeeTable title={activeTab} rows={dataEmployees}/>}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
