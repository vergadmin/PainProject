import React from 'react';
import '../CSS/Introduction.css'; // Importing the CSS file
import { Link } from 'react-router-dom';

function Transition() {
    return (
      <div className='introduction'>
        <p className="description">You are now about to interact with the second virtual patient. Please click the button below to continue.</p>
        <br/>
        <div className={`hide-buttons show`}>
            <button className='important-btn pulse'><Link className="button-link-light" to="/interaction">Continue to Next Patient</Link></button>
        </div>
      </div>
    );
}

export default Transition;
