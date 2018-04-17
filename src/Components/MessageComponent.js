import React, { Component } from 'react'


class MessageComponent extends Component {
  render() {
  const {message, toggleStar, toggleSelect} = this.props
  const readClass = message.read ? 'read' : 'unread'
  const starClass = message.starred ? 'fa-star' : 'fa-star-o'
  const selectedClass = message.selected ? 'selected' : ''

  const starMessage = e => {
    e.stopPropagation();
    toggleStar(message)
  }
  
    return (
      <div className={`row message ${readClass} ${selectedClass}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input 
                type="checkbox" 
                checked={!!message.selected}
                readOnly={true}
                onClick={() => toggleSelect(message)}
              />
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starClass}`} onClick={starMessage}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {message.labels ? message.labels.map((label, i) => 
            <span className="label label-warning" key={i}>{label}</span>
          ) : ''}
          <a href=".">{message.subject}</a>
        </div>
      </div>
    )
  }
}

export default MessageComponent