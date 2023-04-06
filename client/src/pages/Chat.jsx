import React from "react";
import ChatBar from "../components/Chat/chatBar.jsx";
import ChatBody from "../components/Chat/chatBody.jsx";
import ChatFooter from "../components/Chat/chatFooter.jsx";


const Chat = ({ socket }) => {
  const [messages, setMessages] = React.useState([]);
  const [typingStatus, setTypingStatus] = React.useState('');
  const lastMessageRef = React.useRef(null);

  React.useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  React.useEffect(() => {
    //  scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  React.useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);
  
  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody 
          messages={messages} 
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          socket={socket}
           />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default Chat;