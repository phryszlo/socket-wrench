import React from 'react'

function MouseBox({ mouseFunction, box_id }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const boxRef = React.useRef(null)

  // const ws = new WebSocket(`ws://localhost:4001`);

  // const testMsg = {
  //   "el1": "doof",
  //   "el2": "tarkq"
  // }


  const sendPosition = (x, y) => {

  }

  React.useEffect(() => {
    const ws = new WebSocket(`ws://localhost:4001`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ 'open': 'hi' }))
    }

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          // console.log(`data: ${JSON.stringify(json)}`)
        }
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      ws.close()
    }

  })



  React.useEffect(() => {
    const handleMouseMove = event => {
      console.log(`${event.clientX}, ${event.clientY}`);
    };

    const element = boxRef.current;

    // element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mousemove', mouseFunction);

    return () => {
      element.removeEventListener('mousemove', mouseFunction);
    };
  }, []);


  // 🔸🔸🔸🔸🔸🔸🔸🔸🔸
  return (
    <div id={box_id} className="mouse-box" ref={boxRef}>
      <template className="cursor">
        <svg viewBox="0 0 16.3 24.7" className="cursor">
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            d="M15.6 15.6L.6.6v20.5l4.6-4.5 3.2 7.5 3.4-1.3-3-7.2z" />
        </svg>
      </template>
    </div>
  )
}

export default MouseBox