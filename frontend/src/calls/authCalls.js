import axios from "axios";
import { logOut, setLogedInStatus, logInError, logInSuccess, logInStart, getTablesStart, getTablesError, getTablesSuccess, setLogedInStatusStart, regiterNext, regiterStart, regiterError, regiterSuccess } from "../data/userSlice";

const server = axios.create({
  withCredentials: true,
});

const serverIp = "http://127.0.0.1:5000";

export const isLoggedIn = async (dispatchAction) => {
  try {
    dispatchAction(setLogedInStatusStart());
    const resp = await server.get(serverIp + "/@me");

    if (resp.data.error === "Unauthorized") {
      // dispatchAction(logOut())
      console.log("unauth")
    } else {
      dispatchAction(setLogedInStatus(true))
    }
  } catch (error) {
    console.error("Some error occured")
  }

}

export const logUserIn = async (email, password, dispatchAction, navigate) => {
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
        dispatchAction(logInSuccess(resp.data));
        navigate("/")
      }
  
  
    } catch (error) {
      dispatchAction(logInError({ "error": "An error occurred. Request again later" }));
    }
  };


  export const registerUserFirstStep = async (userInfo, dispatchAction) => {

    try {
      const {email, login, password, confirmPassword, role} = userInfo;

      dispatchAction(regiterStart())
      
      const resp = await server.post(`${serverIp}/auth/register-first-step`, {
        email,
        password,
        login,
        confirmPassword,
        role,
      });
      
      console.log("resp: ", resp)
      if (resp.data.error != null) {
        dispatchAction(regiterError(resp.data));
        return false
      }
      else {
        dispatchAction(regiterNext());
        return true
      }
  
  
    } catch (resp) {
      dispatchAction(regiterError({ "error": resp.data.error }));
      return false
    }
  };


  export const registerUser = async (userInfo, dispatchAction, navigate) => {

    try {
      const {email, login, password, confirmPassword, role, surname, name, middle_name, tin, passport, position} = userInfo;

      dispatchAction(regiterStart())
      
      const resp = await server.post(`${serverIp}/auth/register-final`, {
        email,
        password,
        login,
        confirmPassword,
        role,
        surname,
        name,
        middle_name,
        tin,
        passport,
        position
      });
      

      if (resp.data.error != null) {
        dispatchAction(regiterError(resp.data));
      }
      else {
        dispatchAction(regiterSuccess());
        navigate("/")
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
      dispatchAction(getTablesError());
    }
  };

  export const getUserRole = async (setUserRole) => {
    try {
      const resp = await server.get(`${serverIp}/@me/role`,);
      console.log(resp.data.rolname)
      if (resp.data.error != null) {
        console.error(resp.data.error)
      }
  
      else {
        setUserRole(resp.data.rolname)
      }
    } catch (error) {
      console.error(error);
     
    }
  };