import React, { Component} from 'react'
import Messages from './Messages'
import Toolbar from './Toolbar'

const messageData = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

const getLabels = (action, selected, currentLabels, activeLabel) => {
  if (!selected || activeLabel === 'Apply label') return currentLabels
  if (action === 'add'){
    const labelExists = currentLabels.find(label => label === activeLabel)
    const labels = labelExists ? currentLabels : [...currentLabels, activeLabel].sort()
    return labels
  }
  if (action === 'remove'){
    const labels = currentLabels.filter(label => label !== activeLabel)
    return labels
  }
}


class MessageData extends Component {
  constructor() {
    super()
     this.state = {messages: [], compose: false};
  }

  componentDidMount = () => {
  this.getMessages();
}

  getMessages = () => {
    this.setState({messages: messageData})
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
    this.setState({messages})
  }

  handleStar = id => {
    const messages = this.state.messages.map(message => message.id === id ? {...message, starred: true} : message);
    this.setState({messages})
  }

  handleDelete = () => {
      const messages = this.state.messages.filter(message => !message.selected)
      this.setState({messages})
    }

  markAsRead = () => {
      const messages = this.state.messages.map(message => ({...message, read: message.selected ? true : message.read }))
      this.setState({messages})
    }

  markAsUnread = () => {
      const messages = this.state.messages.map(message => ({...message, read: message.selected ? false : message.read }))
      this.setState({messages})
    }

    handleAddLabel = label => {
      const messages = this.state.messages.map(message => ({...message, labels: getLabels('add',message.selected, message.labels,label)}))
      this.setState({messages})
    }

    handleRemoveLabel = label => {
      const messages = this.state.messages.map(message => ({...message, labels: getLabels('remove',message.selected, message.labels,label)}))
      this.setState({messages})
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
   } = this;
   return (
     <div className="container">
       <Toolbar {...{messages, handleSelectAll, handleDelete, handleAddLabel, handleRemoveLabel, markAsRead, markAsUnread}} />
       <Messages {...{messages, handleSelect, handleSelectAll, handleStar}} />
     </div>
   );
 }
}

export default MessageData
