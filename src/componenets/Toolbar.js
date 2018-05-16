import React from 'react';
import labels from '../labels.json';

const icon = messages => {
  if (messages.every(data => data.selected)) return 'fa fa-check-square-o';
  if (messages.some(data => data.selected)) return 'fa fa-minus-square-o';
  return 'fa fa-square-o';
}

const disable = messages => messages.some(data => data.selected) ? '' : 'disabled';

const Toolbar = ({messages, handleSelectAll, handleDelete, handleAddLabel, handleRemoveLabel, markAsRead, markAsUnread, toggleCompose}) => {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{messages.reduce((acc, data) => data.read ? acc : acc+1,0)}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={toggleCompose}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={handleSelectAll}>
            <i className={icon(messages)}></i>
          </button>

          <button className="btn btn-default" disabled={disable(messages)} onClick={markAsRead}>Mark As Read</button>

          <button className="btn btn-default" disabled={disable(messages)} onClick={markAsUnread}>Mark As Unread</button>

          <select className="form-control label-select" disabled={disable(messages)} onChange={event => handleAddLabel(event.target.value)}>
            <option>Apply label</option>
            {labels.map((label, i) => (<option key={i} value={label}>{label}</option>))}
          </select>

          <select className="form-control label-select" disabled={disable(messages)} onChange={event => handleRemoveLabel(event.target.value)}>
            <option>Remove label</option>
            {labels.map((label, i) => (<option key={i} value={label}>{label}</option>))}
          </select>

          <button className="btn btn-default" disabled={disable(messages)} onClick={handleDelete}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }

export default Toolbar;
