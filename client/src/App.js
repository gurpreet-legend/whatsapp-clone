import io from 'socket.io-client'
import nanaid from "nanoid";
import {useState, useEffect} from 'react'
import { BiSend } from 'react-icons/bi';
import { GoPlus } from "react-icons/go";

//env stuff :
// const PORT = process.env.PORT || 5000
const socket = io.connect('http://localhost:5000')


function App() {
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [online, setOnline] = useState(false);
  const [chat, setChat] = useState([])

    const sendChat = (e) => {
      e.preventDefault();
      const userID = socket.id;
      if(room != '')
        setChat([...chat, {message, userID, room}]);
      socket.emit("chat", {message, userID, room})
      setMessage('')
      // setRoom('');
    }

    const joinRoom = (e) => {
      e.preventDefault();
      socket.emit("join-room", room)
    }

    useEffect(() => {
      socket.on("recieve-message", (payload) => {
        setChat([...chat, payload])
        // console.log('uSEeFFECT CALLED')
      })
    })


  return (
    <div className="App">
      <div className='heading'>
        <img src="/wt-logo.png" alt="logo" />
        <h1>Whatsapp Clone</h1>
      </div>
      <div className="chat-container">
        <img src='/whatsapp-bg.png' alt="bg-image" className='bgImg'/>
        {chat.map((payload, index) => {
          return (
            <div className='chat-block'>
              <p key={index}>{payload.message}</p>
              <p className='userID'>{payload.userID}</p>
            </div>
          )
        }
        )}
      </div>
      <div className="input-container">
        <form onSubmit={sendChat} className='input-form'>
          <input 
            className='input-message'
            type="text" 
            name="chat" 
            placeholder="Enter message" 
            value={message} 
            onChange={(e)=> {
              setMessage(e.target.value);
            }}/>
            <button type="submit" className='btn'><BiSend/></button>
        </form>
        <form onSubmit={joinRoom} className='input-form'>
        <input 
              className='input'
              type="text" 
              name="room" 
              placeholder="Enter room" 
              value={room} 
              onChange={(e)=> {
                setRoom(e.target.value);
              }}
            />
            <button type="submit" className='btn'><GoPlus/></button>
        </form>
      </div>
    </div>
  );
}

export default App;
