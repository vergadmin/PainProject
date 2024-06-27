// ModalComponent.js
import React from 'react';
import '../CSS/ModalComponent.css';

const ModalComponent = ({ isOpen, type, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const redirect = () => {
    window.location.href = 'https://www.example.com';
  };

  let content;

  if (type === 'finished') {
    content = (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>Are you sure?</h2>
          <p>You are about to end your interaction with the virtual patient. If you wish to continue, click the button below.</p>
          <br/>
          <button className="default-btn" onClick={redirect}>Continue to Post-Survey</button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>Help</h2> {/* Change this to any other content you need */}
          <p>We have not implemented this yet, but will soon! :)</p>
          <br/>
        </div>
      </div>
    );
  }

  return content;
};

export default ModalComponent;
