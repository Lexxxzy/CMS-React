import axios from "axios";
import { logOut, setLogedInStatus, logInError, logInSuccess, logInStart, getTablesStart, getTablesError, getTablesSuccess } from "../data/userSlice";

const server = axios.create({
  withCredentials: true,
});

const serverIp = "http://127.0.0.1:5000";

export const isLoggedIn = async (dispatchAction) => {
  try {
    const resp = await server.get(serverIp + "/@me");

    if (resp.data.error === "Unauthorized") {
      dispatchAction(logOut())
      window.location.href = "/login"
    } else {
      dispatchAction(setLogedInStatus(true))
    }
  } catch (error) {
    console.error("Some error occured")
  }

}

export const logUserIn = async (email, password, dispatchAction) => {
    try {
      dispatchAction(logInStart())
      
      const resp = await server.post(`${serverIp}/auth/login`, {
        email,
        password,
      });
      

      if (resp.data.error != null) {
        dispatchAction(logInError(resp.data));
      }
      else {
        getTables(dispatchAction);

        dispatchAction(logInSuccess(resp.data));
        window.location.href = "/"
      }
  
  
    } catch (error) {
      dispatchAction(logInError({ "error": "An error occurred. Request again later" }));
    }
  };

  export const getTables = async (dispatchAction) => {
    try {
      dispatchAction(getTablesStart())
      const resp = await server.get(`${serverIp}/cms/get-tables`);
      
      if (resp.data.error != null) {
        dispatchAction(getTablesError());
      }
      else {
        dispatchAction(getTablesSuccess(resp.data));
      }
  
  
    } catch (error) {
      dispatchAction(logInError({ "error": "An error occurred. Request again later" }));
    }
  };