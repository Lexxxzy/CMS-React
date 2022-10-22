import React from "react";
import cn from "classnames";

const icons = {
  contracts: "svg/Contracts.svg",
  cusomers: "svg/Customers.svg",
  employees: "svg/employees.svg",
  home: "svg/Home.svg",
  profile: "svg/Profile.svg",
  signout: "svg/SignOut.svg",
  tasks: "svg/Tasks.svg",
  };

const Icon = (props) => {
  const size = props.size ? props.size : 16;
  return (
    <img className={cn(props.className)} src={icons[props.name]} alt={props.name} width={size} height={size}></img>
  );
};

export default Icon;
