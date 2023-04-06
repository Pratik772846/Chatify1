import React from "react";
import Chat from "./pages/Chat.jsx";
import Homepage from "./pages/Homepage.jsx"
import {Route,Routes} from "react-router-dom";
import Protected from "./pages/Protected.jsx";
import  ProtectHome  from "./pages/ProtectHome.jsx";
// import socketIO from "socket.io-client";
// const socket = socketIO.connect('http://localhost:5000');
import socket from "./utils/socket.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={
        <ProtectHome>
          <Homepage socket={socket}/>
        </ProtectHome>
        }/>
        <Route exact path="/chats" element={
          <Protected >
            <Chat socket={socket}/>
          </Protected>
        }/>
        {/* <Route exact path="/chats" element={<Protected socket={socket}/>}/> */}
      </Routes>
      
    </div>
  );
}

export default App;
