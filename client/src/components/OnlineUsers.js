import React from 'react';
import { RiRadioButtonLine } from 'react-icons/ri';

function OnlineUsers({ onlineUsers }) {
  return (
    <div className="onlineUser-container">
      <h1>
        <RiRadioButtonLine style={{ color: 'green' }} />
        {' '}
        Online Users
      </h1>
      <div>
        {onlineUsers.map((user, index) => (
          <p key={index}>{user}</p>
        ))}
      </div>
    </div>
  );
}

export default OnlineUsers;
