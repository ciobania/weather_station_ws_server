const WebSocket = require('ws');
const url = 'ws://192.168.1.115:1337';
const ws = new WebSocket(url);


ws.onopen = () => {
    ws.send('Message From Client ' + process.env.CLIENT_ID.toString())
};

ws.onerror = (error) => {
    console.log(`WebSocket error: ${error.target.toString()}`)
};

ws.onmessage = (e) => {
    console.log(e.data)
};

