import io from 'socket.io-client'
import nanaid from "nanoid";
import {useState, useEffect} from 'react'
import { BiSend } from 'react-icons/bi';

//env stuff :
// const PORT = process.env.PORT || 5000
const socket = io.connect('http://localhost:5000')


function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

    const sendChat = (e) => {
      e.preventDefault();
      socket.emit("chat", {message})
      setMessage('')
    }

    useEffect(() => {
      socket.on("recieve-message", (payload) => {
        setChat([...chat, payload])
        console.log('uSEeFFECT CALLED')
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
            <p key={index} className='chat-p'>{payload.message}</p>
          )
        }
        )}
      </div>
      <form onSubmit={sendChat} className='input-form'>
        <input 
          className='input'
          type="text" 
          name="chat" 
          placeholder="Enter message" 
          value={message} 
          onChange={(e)=> {
            setMessage(e.target.value);
          }}/>
          <button type="submit" className='btn'><BiSend/></button>
          
      </form>
    </div>
  );
}

export default App;
