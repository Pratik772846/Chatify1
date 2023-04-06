import React from 'react'
import { Navigate } from "react-router-dom";
export const ProtectHome = ({children}) => {
  
    const log = localStorage.getItem('logged');
    // const logged =useLoggedIn((state)=>state.isLoggedIn);
    // console.log(logged);
    // console.log(log);
    // React.useEffect(()=>{
    //     if(!log){
    //         // logged();
    //         return <Navigate to="/"/>
    //     }
    // })
    // return children;

    if (log) {
        return <Navigate to="/chats" replace />;
    }
        return children;
  
}
export default ProtectHome;
