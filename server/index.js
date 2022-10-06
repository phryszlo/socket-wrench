import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import methodOverride from 'method-override';
import cors from 'cors';

const WS_PORT = 4001;
const app = new express();

const wss = new WebSocketServer({ port: WS_PORT });

const clients = new Map();

app.use(express.json());


wss.on('connection', (ws) => {
  const id = uuidv4();
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };

  clients.set(ws, metadata);
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    const metadata = clients.get(ws);
    message.sender = metadata.id;
    message.color = metadata.color;
    const outbound = JSON.stringify(message);
    [...clients.keys()].forEach((client) => {
      client.send(JSON.stringify({thing1: outbound, thing2: 'server msg'}));
    })
 
    console.log(`ws received ${data} : ${message}`);
  });

  ws.on('close', () => {
    clients.delete(ws);
  })
});



function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
console.log(`wss up on ${WS_PORT}`);

// app.listen(WS_PORT, () => { console.log(`on port ${WS_PORT}`) });