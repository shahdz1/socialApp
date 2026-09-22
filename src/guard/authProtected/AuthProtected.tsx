import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function AuthProtected({children}:{children:ReactNode}) {
  if(localStorage.getItem("token") !== null){
    return <Navigate to ={"/home"}/>;
  }
  else{
    return children;
  }
}
