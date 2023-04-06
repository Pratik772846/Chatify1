import { Navigate } from "react-router-dom";
import useLoggedIn  from "../utils/state";
import React from "react";

const Protected = ({ children }) => {
    const log = localStorage.getItem('logged');
    const logged =useLoggedIn((state)=>state.changeloggedstatus);
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

    if (!log) {
        return <Navigate to="/" replace />;
    }
        return children;
        
};
export default Protected;
