const app = require('express')();
const server = require('http').createServer(app);
const socketControllers = require('./controllers/socketController')

const io = require('socket.io')(server, {
    cors: {
      origin: "*" // To remove Cross-origin error
    }
});

const router = require('./routes/router');

const PORT = process.env.PORT || 5000

io.on('connection', (socket)=> {
    console.log('Socket is connected!!');

    socket.on("chat", (payload) => {
        socketControllers.handleChat(payload, socket, io);
    })

    socket.on("join-room", room => {
        socket.join(room);
    })

    socket.on("get-online-users", room => {
        socketControllers.getOnlineUsers(room, socket, io);
    })

    socket.on('disconnect', () => {
        socket.emit("disconnect-id", socket.id)
    })
})

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}...`)
})