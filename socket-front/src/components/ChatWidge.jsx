import React from 'react'

function ChatWidge({id, auto}) {
  return (
    <div className="chat-widge">
      <span className="chat-widge-title">
        {id}
      </span>
      <div className="chat-div in-div">
        <textarea
          name="chat-in"
          className="chat-txt chat-in"
          placeholder="send-text"
          cols="30"
          rows="3" />
      </div>
      {
        auto && <button className="send-button">send</button>
      }
      <div className="chat-div out-div">
        <textarea
          name="chat-out"
          className="chat-txt chat-out"
          placeholder="receive-text"
          cols="30"
          rows="3" />
      </div>
    </div>
  )
}

export default ChatWidge