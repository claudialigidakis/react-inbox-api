import React, {Component} from 'react'
import axios from 'axios'
import Messages from './Messages'
import Toolbar from './Toolbar'
import Compose from './Compose'

const request = (path, method = 'get', body = null) => {
  let bearerToken = '';
  const token = localStorage.getItem('token');

  if (token) {
    bearerToken = `Bearer ${token}`;
  }

  return axios(`http://localhost:8082/api/${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
    },
    data: body
  });
}

class Display extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      compose: false
    };
  }

  componentDidMount = () => {
    this.getMessages();
  }

  getMessages = () => {
    request('messages')
      .then(response => {this.setState({messages: response.data})})
      .catch(console.error);

  }

  getSelected = () => this.state.messages.filter(message => message.selected).map(message => message.id);

  handleSelect = (id, selected) => {
    const messages = this.state.messages.map(message => message.id === id ? {...message, selected} : message);
    this.setState({messages});
  }

  handleSelectAll = () => {
    let {messages} = this.state;
   if (messages.every(data => data.selected)) {
     messages = messages.map(message => ({...message, selected: false }));
   } else {
     messages = messages.map(message => ({...message, selected: true }));
   }
   this.setState({messages});
  }

  handleStar = id => {
    request('messages', 'patch', {messageIds: [id], command: 'star'})
      .then(response => {this.getMessages()})
      .catch(console.error);
  }

  handleDelete = () => {
    request('messages', 'patch', {messageIds: this.getSelected(), command: 'delete'})
     .then(response => {this.getMessages()})
     .catch(console.error);
  }

  markAsRead = () => {
    request('messages', 'patch', {messageIds: this.getSelected(), command: 'read', read: true})
       .then(response => {this.getMessages()})
       .catch(console.error);
  }

  markAsUnread = () => {
    request('messages', 'patch', {messageIds: this.getSelected(), command: 'read', read: false})
      .then(response => {this.getMessages()})
      .catch(console.error);
  }

  handleAddLabel = label => {
    request('messages', 'patch', {messageIds: this.getSelected(), command: 'addLabel', label})
      .then(response => {this.getMessages()})
      .catch(console.error);
  }

  handleRemoveLabel = label => {
    request('messages', 'patch', {messageIds: this.getSelected(), command: 'removeLabel', label})
     .then(response => {this.getMessages()})
     .catch(console.error);
  }

  toggleCompose = () => {
    this.setState({compose: !this.state.compose});
  }

  handleCompose = (subject, body) => {
    request('messages', 'post', {subject, body})
       .then(response => {this.getMessages()})
       .catch(console.error);
  }

  render = () => {
    const messages = this.state.messages;
    const {
      handleSelect,
      handleSelectAll,
      handleStar,
      handleDelete,
      handleAddLabel,
      handleRemoveLabel,
      markAsRead,
      markAsUnread,
      toggleCompose,
      handleCompose
    } = this;
    return (<div className="container">
      <Toolbar {...{messages, handleSelectAll, handleDelete, handleAddLabel, handleRemoveLabel, markAsRead, markAsUnread, toggleCompose}}/> {
        this.state.compose
          ? <Compose {...{toggleCompose, handleCompose}}/>
          : null
      }
      <Messages {...{messages, handleSelect, handleSelectAll, handleStar}}/>
    </div>);
  }
}

export default Display
