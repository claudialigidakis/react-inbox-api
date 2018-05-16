import React from 'react'
import Messages from './Messages.js'


const Messages = ({messages, ...methods}) => {
  return message.map(message => <Messages {...message} key={message.id} {...methods} />);
}

export default Messages
