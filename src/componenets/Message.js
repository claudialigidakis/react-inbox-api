import React from 'react'


const Message = ({id, subject, read, selected, starred, labels, handleSelect, handleStar}) => {
  return (
    <div>
     <div className={['row', 'message', read ? 'read' : 'unread', selected ? 'selected' : ''].join(' ')}>
       <div className="col-xs-1">
         <div className="row">
           <div className="col-xs-2">
             <input type="checkbox" checked={selected ? 'checked' : ''} onChange={event => handleSelect(id, event.target.checked)} />
           </div>
           <div className="col-xs-2">
             <i className={['star', 'fa', starred ? 'fa-star' : 'fa-star-o'].join(' ')} onClick={event => handleStar(id)} />
           </div>
         </div>
       </div>
       <div className="col-xs-11">
         {labels.map((label, i) => (<span className="label label-warning" key={i}>{label}</span>))}
         <a>{subject}</a>
       </div>
     </div>
   </div>
 );
}

export default Message;
