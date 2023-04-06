import React from 'react';
import { useNavigate } from 'react-router-dom';


const ChatBody = ({ messages,lastMessageRef,typingStatus,socket }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem("logged");
    // socket.emit('disconnected');
    navigate('/');
    window.location.reload();
  };

  // messages.map((message)=>{
  //   console.log(message.name);
  //   const a =(localStorage.getItem('userInfo'));
  //   const b= JSON.parse(a);
  //   console.log(b.name);
  // })

  return (
    <>
      <header className="chat__mainHeader">
        <h1>Hangout with Friends(Chatify)</h1>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === JSON.parse(localStorage.getItem('userInfo')).name ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef}/>
      </div>
    </>
  );
};

export default ChatBody;