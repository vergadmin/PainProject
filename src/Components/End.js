import React from 'react';
import '../CSS/Introduction.css'; // Importing the CSS file
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Transition() {
    return (
      <div className='introduction'>
        <p className="description">You have completed your training with Daren. Please click the link below to continue to the post-survey on Qualtrics.</p>
        <br/>
        <div className={`hide-buttons show`}>
            <button className='important-btn pulse'><Link className="button-link-light" to="https://iu.co1.qualtrics.com/jfe/form/SV_bNiIsKNqegACkHs">Complete Qualtrics post-survey</Link></button>
        </div>
      </div>
    );
}

export default Transition;
