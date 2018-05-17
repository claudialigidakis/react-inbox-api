import React from 'react';
import Message from './Message';

const Messages = ({messages, ...methods}) => {
  return messages.map(message => <Message {...message} key={message.id} {...methods} />);
}

export default Messages;
