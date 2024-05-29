// Interaction.js
import React from 'react';
import '../CSS/Interaction.css'; // Importing the CSS file
import PatientInfoToggle from '../Helpers/PatientInfoToggle';

function Interaction() {
  return (
      <div className="video-background">
      <video autoPlay muted loop>
        <source id="myVideo"  src="https://painproject-content.s3.amazonaws.com/rhonda-moore-videos/BF_IDLE.mp4" type="video/mp4" />
        {/* Add additional source elements for different video formats */}
        Your browser does not support the video tag.
      </video>
      <div className="content-overlay">
        {/* Add your content here */}
        <PatientInfoToggle />
        <df-messenger
          intent="WELCOME"
          chat-title="Patient: Rhonda Moore"
          agent-id="933558cf-b5c2-455e-8910-c52a1c14ea07"
          language-code="en"
        ></df-messenger>
      </div>
    </div>
  );
}

export default Interaction;
