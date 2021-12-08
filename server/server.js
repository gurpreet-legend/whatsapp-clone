const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "*"
    }
});

io.on('connection', (socket)=> {
    console.log('Socket is connected!!');

    socket.on('diconnect', () => {
        console.log('User has screenLeft, socket has been disconnected !!');
    })
})

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}...`)
})