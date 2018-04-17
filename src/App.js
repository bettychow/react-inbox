import React, { Component } from 'react';
import ToolbarComponent from './Components/ToolbarComponent'
import MessagesComponent from './Components/MessagesComponent'

class App extends Component {
  
  state = {
    messages: this.props.messages
  }

    toggleProperty = (message, property) => {
      const index = this.state.messages.indexOf(message);
      this.setState({
        messages: [
          ...this.state.messages.slice(0, index),
          {...message, [property]: !message[property]},
          ...this.state.messages.slice(index + 1)
        ]
      })
    }

    toggleStar = (message) => {
      this.toggleProperty(message, 'starred')
    }
    
    toggleSelect = message => {
      this.toggleProperty(message, 'selected')
    }

    markReadStatus = (readStatus) => {
      this.setState({
        messages: this.state.messages.map(message => 
          message.selected ? {...message, read: readStatus } : message
        )
      })
    }

    applyRemoveLabel = (label, addLabel) => {
      this.setState({
        messages: this.state.messages.map(message => {
          if(message.selected && label !== 'Apply label') {
            const index = message.labels.indexOf(label)
            if(index < 0 && addLabel) {
               message.labels.push(label)
            }
            if(index >= 0 && !addLabel) {
              message.labels.splice(index, 1)
            }  
          } 
          return message
        })
      })
    }

    toggleSelectAll = () => {
      const selectedMessages = this.state.messages.filter( message => message.selected)
      const selected = selectedMessages.length !== this.state.messages.length

      this.setState({
        messages: this.state.messages.map(
          message => 
            message.selected !== selected ? {...message, selected } : message
        )
      })
    }

    deleteMessage = () => {
      this.setState({
        messages: this.state.messages.filter(message => !message.selected )
      })
    }

  render() {

    return (
      <div className="App">
        <ToolbarComponent 
          messages={this.state.messages}
          toggleSelectAll={this.toggleSelectAll}
          markReadStatus={this.markReadStatus}
          deleteMessage={this.deleteMessage}
          applyRemoveLabel={this.applyRemoveLabel}
          removeLabel={this.removeLabel}
        />
        <MessagesComponent 
          messages={this.state.messages}
          toggleStar={this.toggleStar}
          toggleSelect={this.toggleSelect}
        />
      </div>
    );
  }
}

export default App;
