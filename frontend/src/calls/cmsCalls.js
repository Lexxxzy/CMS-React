import axios from "axios";
import { getEmployeesError, getEmployeesStart, getEmployeesSuccess } from "../data/employeesSlice";
import { getRepresentativesError, getRepresentativesStart, getRepresentativesSuccess } from "../data/representativesSlice";
import { getTasksError, getTasksStart, getTasksSuccess } from "../data/tasksSlice";
import { setUserInfoError, setUserInfoStart, setUserInfoSuccess } from "../data/userSlice";

const server = axios.create({
  withCredentials: true,
});

const serverIp = "//127.0.0.1:5000/cms";

export const getTasks = async (dispatchAction) => {
  try {
    dispatchAction(getTasksStart())
    const resp = await server.get(`${serverIp}/get-tasks`);

    if (resp.data.error != null) {
      dispatchAction(getTasksError());
    }
    else {
      dispatchAction(getTasksSuccess(resp.data));
    }


  } catch (error) {
    dispatchAction(getTasksError({ "error": "An error occurred. Request again later" }));
  }
};

export const getUserInfo = async (dispatchAction) => {
  try {
    const resp = await server.get(`${serverIp}/user-info`);

    if (resp.data.error != null) {
      dispatchAction(getTasksError());
    }
    else {
      console.log(resp.data[0])
      dispatchAction(setUserInfoSuccess(resp.data[0]))
    }

  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });
  }
};

export const getEmployees = async (dispatchAction) => {
  try {
    getEmployeesStart()
    const resp = await server.get(`${serverIp}/employees`);

    if (resp.data.error != null) {
      dispatchAction(getEmployeesError());
    }
    else {
      console.log(resp.data)
      dispatchAction(getEmployeesSuccess(resp.data))
    }

  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });
  }
};

export const getRepresentatives = async (dispatchAction) => {
  try {
    getRepresentativesStart()
    const resp = await server.get(`${serverIp}/representatives`);

    if (resp.data.error != null) {
      dispatchAction(getRepresentativesError());
    }
    else {
      console.log(resp.data)
      dispatchAction(getRepresentativesSuccess(resp.data))
    }

  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });
  }
};

export const getAnalytics = async (setPending, setAnalytics) => {
  try {
    setPending(true)
    const resp = await server.get(`${serverIp}/analytics`);

    if (resp.data.error != null) {
      console.error(resp.data.error)
      setPending(false)

    }
    else {
      setPending(false)
      setAnalytics(resp.data)
    }
  } catch (error) {
    console.error({ "error": "An error occurred. Request again later" });
  }
};

export const getCustomers = async (setPending, setCustomers) => {
  try {
    setPending(true)
    const resp = await server.get(`${serverIp}/customers`);

    if (resp.data.error != null) {
      console.error(resp.data.error)
      setPending(false)
    }
    else {
      setPending(false)
      setCustomers(resp.data)
    }
  } catch (error) {
    setPending(false)
    console.error({ "error": "An error occurred. Request again later" });
  }
};

export const getRepresentativesNames = async (setPending, setRepresentatives) => {
  try {
    setPending(true)
    const resp = await server.get(`${serverIp}/representative-names`);

    if (resp.data.error != null) {
      console.error(resp.data.error)
      setPending(false)
    }
    else {
      setRepresentatives(resp.data)
      setPending(false)
    }
  } catch (error) {
    setPending(false)
    console.error({ "error": "An error occurred. Request again later" });
  }
};

export const getEmployeesNames = async (setPending, setEmployees) => {
  try {
    setPending(true)
    const resp = await server.get(`${serverIp}/employees-names`);

    if (resp.data.error != null) {
      console.error(resp.data.error)
      setPending(false)
    }
    else {
      setEmployees(resp.data)
      setPending(false)
    }
  } catch (error) {
    setPending(false)
    console.error({ "error": "An error occurred. Request again later" });
  }
};

export const getContractIds = async (setPending, setContracts) => {
  try {
    setPending(true)
    const resp = await server.get(`${serverIp}/contacts-ids`);

    if (resp.data.error != null) {
      console.error(resp.data.error)
      setPending(false)
    }
    else {
      setContracts(resp.data)
      setPending(false)
    }
  } catch (error) {
    setPending(false)
    console.error({ "error": "An error occurred. Request again later" });
  }
};