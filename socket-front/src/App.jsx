import { useState, useRef } from 'react'
// import { SocketProvider } from 'socket.io-react';

import './App.css'
import './style.css'
import MouseBox from './components/MouseBox'
import ChatWidge from './components/ChatWidge'


function App() {
  const [count, setCount] = useState(0)
  const [aDistantMouse, setDistantMouse] = useState(null)
  const pRef = useRef(null)

  const keyboardHandler = (e) => {
    console.log(`${e.target.key}`)
  }

  const mouseDisplayHandler = (e) => {
    console.log(`mouse display handled. 
    ${e.target.getBoundingClientRect().left} ${e.clientX}`);

    setDistantMouse(
      `${(e.clientX - e.target.getBoundingClientRect().left).toFixed(3)}, 
       ${(e.clientY - e.target.getBoundingClientRect().top).toFixed(3)}`
    )

  }

  // 🔸🔸🔸🔸🔸🔸🔸🔸🔸
  return (
    <div className="App">
      <p className="remote-mouse" ref={pRef}>{aDistantMouse}</p>
      <div className="flex-layout-0">
        <section className="chat-section">
          <ChatWidge id="chat1" auto />
          <ChatWidge id="chat2" />
        </section>

        <section className="box-section">
          <MouseBox mouseFunction={mouseDisplayHandler} box_id='box1' />
          <MouseBox mouseFunction={mouseDisplayHandler} box_id='box2' />
        </section>
      </div>
    </div>
  )
}

export default App
