import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Introduction.css'; // Importing the CSS file
import { Link } from 'react-router-dom';
import {baseAPIURL} from '../Helpers/ConversationLogging';

async function LogUserInputToDB(){
  try {
    const response = await fetch(`${baseAPIURL}/pain/logParticipantVisit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {participantID : sessionStorage.getItem("participantID"), 
          visitID : sessionStorage.getItem("visitID"),
          vh : sessionStorage.getItem("vh"),
          loginTime : sessionStorage.getItem("loginTime"),
          userPrompt: sessionStorage.getItem("userPrompt")
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function Introduction() {
    const [showNextButton, setShowNextButton] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        const handleTimeUpdate = () => {
            if (videoElement) {
                const timeRemaining = videoElement.duration - videoElement.currentTime;
                setShowNextButton(timeRemaining <= 5);
            }
        };
    
        if (videoElement) {
          videoElement.addEventListener('timeupdate', handleTimeUpdate);
        }
    
        return () => {
          if (videoElement) {
            videoElement.removeEventListener('timeupdate', handleTimeUpdate);
          }
        };
      }, []);

  return (
    <div className='transition'>
      <h1>Final Instructions from Daren</h1>
      <p className="description">Click the video below to hear some final instructions from Daren.</p>
      <video ref={videoRef} height="500" controls>
        <source src="https://painproject-content.s3.amazonaws.com/didactic-agent/PainProjectTransition.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
        <div className={`hide-buttons ${showNextButton ? 'show' : null}`}>
          <button className='important-btn'><Link className="button-link-light" to="/interaction" onClick={LogUserInputToDB}>✔ Begin Patient Interaction</Link></button>
      </div>
    </div>
  );
}

export default Introduction;
