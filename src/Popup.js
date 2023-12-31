// Popup.js
import React from 'react';
import './Popup.css';

function Popup({ pageCount, onSubmit, onClose }) {
  return (
    <div className="popup">
      <p>Number of Pages: {pageCount}</p>
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Popup;
