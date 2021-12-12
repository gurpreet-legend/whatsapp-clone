const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*" // To remove Cross-origin error
    }
});

const router = require('./router');

const PORT = process.env.PORT || 5000

io.on('connection', (socket)=> {
    console.log('Socket is connected!!');

    socket.on("chat", payload => {
        console.log(payload)
        io.emit("recieve-message", payload );
    })
    socket.on('diconnect', () => {
        console.log('User has screenLeft, socket has been disconnected !!');
    })
})

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}...`)
})