import React from 'react'
import { RiRadioButtonLine } from "react-icons/ri";

const OnlineUsers = ({onlineUsers}) => {
    return (
        <div  className='onlineUser-container'>
            <h1><RiRadioButtonLine style={{color: 'green'}}/> Online Users</h1>
            <div>
                {onlineUsers.map((user, index) => {
                    return (
                        <p key={index}>{user}</p>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default OnlineUsers
