// Interaction.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../CSS/Interaction.css'; // Importing the CSS file
import PatientInfoToggle from '../Helpers/PatientInfoToggle';
import { LogMessagesToDB } from '../Helpers/ConversationLogging';

function Interaction() {
  const [responseVideoSrc, setResponseVideoSrc] = useState('');
  const [responseVideoVisibility, setResponseVideoVisibility] = useState('hide');
  const [idleVideoVisibility, setIdleVideoVisibility] = useState('show');
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const [lastSystemResponse, setLastSystemResponse] = useState('');

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

  const getLastInteraction = useCallback(() => {
    const interaction = {
      userMessage: lastUserMessage,
      systemResponse: lastSystemResponse,
      messageTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    return interaction;
  }, [lastUserMessage, lastSystemResponse]);
  
  const fetchSynthesiaVideo = useCallback(() => {
    dfMessengerRef.current.addEventListener('df-response-received', (event) => {
      const userMessage = event.detail.response.queryResult.queryText;
      const systemResponse = event.detail.response.queryResult.fulfillmentText;

      setLastUserMessage(userMessage);
      setLastSystemResponse(systemResponse);

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
    var lastMessage = getLastInteraction();
    LogMessagesToDB(lastMessage);
    fetchSynthesiaVideo();
  }, [fetchSynthesiaVideo, getLastInteraction]);

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
        <div className='btn-box'>
        <button className="important-btn btn-spacing">Need Help?</button>
        <button className="important-btn">Finished?</button>
        </div>
        <PatientInfoToggle />
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
        <df-messenger
          intent="WELCOME"
          chat-title="vpip-RhondaMoore"
          agent-id="f2116458-3970-4407-8f5a-b74041399bbe"
          language-code="en"
        ></df-messenger>
      </div>
    </div>
  );
}

export default Interaction;