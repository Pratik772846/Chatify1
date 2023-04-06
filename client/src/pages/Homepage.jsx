import React from "react";
import Tab from "../components/Homepage/Tab.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useLoggedIn from "../utils/state.js"


const Homepage = ({socket})=>{
    const navigate = useNavigate();
    
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

    return(
        <div className="h-screen flex items-center justify-center bg-purple-200">
            <div className="relative container bg-purple-200 rounded-lg w-1/2 h-2/3">
                <div className="h-1/6 w-full rounded-lg bg-white ">
                        <h1 className="text-center h-full text-5xl pt-5">Chat App</h1>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-3/4 w-full rounded-lg bg-white align-bottom overflow-auto">
                    <Tab socket={socket}/>
                </div>
            </div>

        </div>

    )
}
export default Homepage;