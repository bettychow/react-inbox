import React, { Component } from 'react';

class ToolbarComponent extends Component {

  
  render() {
    // let unreadCount = 0;
    const { messages, toggleSelectAll, markReadStatus, deleteMessage, applyLabel, removeLabel } = this.props
    const selectedCount = messages.filter(message => message.selected).length;
    const unreadMessages = messages.filter(message => !message.read).length
    let selectAllClass;

    const changeHandler = (e, addLabel) => {
      const selectedIndex = e.target.selectedIndex
      const labelSelected = e.target.options[selectedIndex].value
      addLabel ? applyLabel(labelSelected) : removeLabel(labelSelected)
    }

    switch (selectedCount) {
      case 0:
        selectAllClass = 'fa-square-o';
        break;
      case messages.length:
        selectAllClass = 'fa-check-square-o'
        break;
      default:
        selectAllClass = 'fa-minus-square-o'
    }
    
    return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge"></span>
          {unreadMessages} unread messages
        </p>

        <button className="btn btn-default" onClick={toggleSelectAll}>
          <i className={`fa ${selectAllClass}`}></i>
        </button>

        <button 
          className="btn btn-default"
          onClick={() => markReadStatus(true)}
          disabled={selectedCount === 0}
        >
          Mark As Read
        </button>
          
        <button 
          className="btn btn-default"
          onClick={() => markReadStatus(false)}
          disabled={selectedCount === 0}
        >
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={(e) => changeHandler(e, true)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool" >gschool</option>
        </select>

        <select className="form-control label-select" onChange={(e) => changeHandler(e,false)}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o" onClick={deleteMessage}></i>
        </button>
      </div>
    </div>
    )
  }
}

export default ToolbarComponent;
