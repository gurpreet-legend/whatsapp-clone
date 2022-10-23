import io from 'socket.io-client'
// import nanaid from "nanoid";
import { useState, useEffect } from 'react'
import { BiSend } from 'react-icons/bi';
import { GoPlus } from "react-icons/go";
import OnlineUsers from '../components/OnlineUsers';

import firebase from "../firebase"
import { UserAuth } from '../context/authContext';

//FIREBASE SET-UP
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp
} from 'firebase/firestore'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'

const db = getFirestore()

//env stuff :
// const PORT = process.env.PORT || 5000
const socket = io.connect('http://localhost:5000')
function Home() {
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [chat, setChat] = useState([])
    // collection ref
    const roomsColRef = collection(db, 'rooms')
    // queries
    const roomRef = query(roomsColRef, where("roomID", "==", room))

    const navigate = useNavigate()
    const { user } = UserAuth();

    const sendChat = (e) => {
        e.preventDefault();
        const userID = socket.id;
        if (room != '') {
            onSnapshot(roomRef, (snapshot) => {

                console.log(snapshot)

                const chatColRef = collection(db, 'rooms', snapshot.docs[0].id, 'chat')
                addDoc(chatColRef, {
                    message: message,
                    userID: userID,
                    userName: `${userID}+name`,
                    timeStamp: serverTimestamp()
                })
            })

        }
        let currTimeStamp = new Date()
        setChat([...chat, { message, userID, room, timeStamp: currTimeStamp, }]);
        socket.emit("chat", { message, userID, room, timeStamp: currTimeStamp })

        setMessage('')
    }

    const getOnlineUsers = () => {
        if (room != "") {
            socket.emit("get-online-users", room)
            socket.on("recieve-online-users", array => {
                setOnlineUsers(array);
            })
        }
    }

    const joinRoom = (e) => {
        e.preventDefault();
        socket.emit("join-room", room)
        localStorage.setItem("roomID", room)
        getOnlineUsers()

        getDocs(roomRef)
            .then(
                (ref) => {
                    if (ref.empty) {
                        addDoc(roomsColRef, {
                            roomID: room
                        })
                        setChat([])
                    }
                    else {
                        const chatColRef = collection(db, 'rooms', ref.docs[0].id, 'chat')
                        getDocs(chatColRef)
                            .then(snap => {
                                let chatArr = snap.docs.map(doc => {
                                    let messageString = doc.data().message;
                                    let userID = doc.data().userID;
                                    let timeStamp = doc.data().timeStamp;
                                    // console.log(doc.data())
                                    return ({ message: messageString, userID, room, timeStamp })
                                })
                                chatArr.sort((x, y) => {
                                    return x.timeStamp - y.timeStamp;
                                })
                                setChat(chatArr)
                            })
                    }
                }
            )

    }


    useEffect(() => {
        socket.on("recieve-message", (payload) => {
            setChat([...chat, payload]);
        })
    })

    useEffect(() => {
        if (!user.accessToken) {
            navigate("/signin");
        }
    })

    useEffect(() => {
        let roomName = localStorage.getItem("roomID")
        console.log(roomName)
        setRoom(roomName)
    }, [])

    console.log(chat)

    return (
        <div>
            <div className="App">
                <Navbar />
                <div className="chat-container">
                    <img src='/whatsapp-bg.png' alt="bg-image" className='bgImg' />
                    <OnlineUsers onlineUsers={onlineUsers} />
                    {chat.length != 0 && chat.map((payload, index) => {
                        return (
                            <div key={index} className={payload.userID == socket.id ? 'chat-block-green' : 'chat-block-white'}>
                                <p key={index}>{payload.message}</p>
                                <p className='userID'>{payload.userName}</p>
                            </div>
                        )
                    })
                    }
                </div>
                <div className="input-container">
                    <form onSubmit={sendChat} className='input-form'>
                        <input
                            className='input-message'
                            type="text"
                            name="chat"
                            placeholder="Enter message"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }} />
                        <button type="submit" className='btn'><BiSend /></button>
                    </form>
                    <form onSubmit={joinRoom} className='input-form'>
                        <input
                            className='input'
                            type="text"
                            name="room"
                            placeholder="Enter room"
                            value={room}
                            onChange={(e) => {
                                setRoom(e.target.value);
                            }}
                        />
                        <button type="submit" className='btn'><GoPlus /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
