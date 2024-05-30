// Interaction.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../CSS/Interaction.css'; // Importing the CSS file
import PatientInfoToggle from '../Helpers/PatientInfoToggle';

function Interaction() {
  const [responseVideoSrc, setResponseVideoSrc] = useState('');
  const [responseVideoVisibility, setResponseVideoVisibility] = useState('hide');
  const [idleVideoVisibility, setIdleVideoVisibility] = useState('show');
  const [isMinimized, setIsMinimized] = useState(false);

  const responseVideoRef = useRef(null);
  const idleVideoRef = useRef(null);
  const dfMessengerRef = useRef(null);

  const toggleMinimize = (toggle) => {
    setIsMinimized(toggle);
  };

  const changeVideoSource = useCallback((newSrc) => {
    console.log("TRIGGERED", newSrc);
    setResponseVideoSrc(newSrc);
    setResponseVideoVisibility('show');
    setIdleVideoVisibility('hide');
    console.log("RESPONSE VIDEO:", responseVideoRef.current);
    console.log("IDLE VIDEO:", idleVideoRef.current);
    toggleMinimize(true);
  }, []);

  const switchToIdle = () => {
    console.log("SWITCHING BACK TO IDLE");
    setResponseVideoVisibility('hide');
    setIdleVideoVisibility('show');
    toggleMinimize(false);
  };

  const fetchSynthesiaVideo = useCallback(() => {
    dfMessengerRef.current.addEventListener('df-response-received', (event) => {
      let displayName = event.detail.response.queryResult.intent.displayName;
      displayName = displayName.replaceAll(" ", "");
      displayName = displayName.replaceAll("/", "_");
      console.log(displayName);
      const AWSVideoURLBase = "https://painproject-content.s3.amazonaws.com/rhonda-moore-videos/";
      const videoURL = `${AWSVideoURLBase}${displayName}.mp4`;
      if (displayName !== "DefaultWelcomeIntent") {
        changeVideoSource(videoURL);
      }
    });
  }, [changeVideoSource]);

  useEffect(() => {
    responseVideoRef.current = document.getElementById("responseVideo");
    idleVideoRef.current = document.getElementById("idleVideo");
    dfMessengerRef.current = document.querySelector('df-messenger');
    fetchSynthesiaVideo();
  }, [fetchSynthesiaVideo]);

  return (
      <div className="video-background">
      <video id="responseVideo" className={responseVideoVisibility} key={responseVideoSrc} onEnded={switchToIdle} autoPlay>
        <source src={responseVideoSrc} type="video/mp4" />
        {/* Add additional source elements for different video formats */}
        Your browser does not support the video tag.
      </video>
      <video id="idleVideo" className={idleVideoVisibility} autoPlay muted loop>
        <source src="https://painproject-content.s3.amazonaws.com/rhonda-moore-videos/BF_IDLE.mp4" type="video/mp4" />
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
          {...(isMinimized ? { minimize: true } : { expand: true })}
        ></df-messenger>
      </div>
    </div>
  );
}

export default Interaction;
