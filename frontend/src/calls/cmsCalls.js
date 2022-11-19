import axios from "axios";
import { getTasksError, getTasksStart, getTasksSuccess } from "../data/tasksSlice";

const server = axios.create({
  withCredentials: true,
});

const serverIp = "http://127.0.0.1:5000/cms";

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