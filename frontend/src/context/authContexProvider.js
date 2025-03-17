import { createContext, useState, useEffect } from "react";
import authServices from "../api/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, isAuthenticated: false });
  const [userInfo, setUserInfo] = useState([])

  const getUserInfo =async () => {
    try{
      const res = await authServices.getProfile(auth?.userId)
      console.log("prfiL", res);
      if(res?.profile){
        setUserInfo(res?.profile)
      }
    }catch(err){
      console.log("err fetching user:", err);
    }
  }

  return (
    <AuthContext.Provider value={{ auth , setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};
