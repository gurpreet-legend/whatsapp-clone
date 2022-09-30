const socketControllers = {
    handleChat: async (payload) => {
        console.log(payload)
        if (payload.room == '') {
            const resObj = { message: "You dont have access to any room", userID: payload.userID, room: "", timeStamp: payload.timeStamp };
            socket.emit("recieve-message", resObj);
        }
        else {
            const resObj = { message: payload.message, userID: payload.userID, room: payload.userID, timeStamp: payload.timeStamp }
            socket.broadcast.to(payload.room).emit("recieve-message", resObj);
        }
    },
    getOnlineUsers: async(room)=>{
        console.log(room)
        const onlineUsersArray = Array.from(io.sockets.adapter.rooms.get(room))
        console.log(onlineUsersArray)
        io.to(room).emit("recieve-online-users", onlineUsersArray)
    }
}

module.exports = socketControllers;