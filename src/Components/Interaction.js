import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../CSS/Interaction.css'; // Importing the CSS file
import PatientInfoToggle from '../Helpers/PatientInfoToggle';
import ModalComponent from '../Helpers/ModalComponent';
import { LogMessagesToDB } from '../Helpers/ConversationLogging';

function Interaction() {
  const [responseVideoSrc, setResponseVideoSrc] = useState('');
  const [responseVideoVisibility, setResponseVideoVisibility] = useState('hide');
  const [idleVideoVisibility, setIdleVideoVisibility] = useState('show');
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const [lastSystemResponse, setLastSystemResponse] = useState('');

  const jimThomasID = "e1cca228-50cd-41f6-b372-abbb9fb844a8";
  const rhondaMooreID = "f2116458-3970-4407-8f5a-b74041399bbe";
  // Default Set to Rhonda Moore
  const [chatTitle, setChatTitle] = useState('Rhonda Moore');
  const [agentID, setAgentID] = useState(rhondaMooreID);
  const [AWSVideoURLBase, setAWSVideoURLBase] = useState("https://painproject-content.s3.amazonaws.com/")
  const [idleVideo, setIdleVideo] = useState("https://painproject-content.s3.amazonaws.com/")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const vh = sessionStorage.getItem("vh");

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

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
      const videoURL = `${AWSVideoURLBase}${displayName}.mp4`;
      if (displayName !== "DefaultWelcomeIntent") {
        changeVideoSource(videoURL);
      }
    });
  }, [changeVideoSource, AWSVideoURLBase]);

  const setVH = useCallback(() => {
    // Determine Base URL Videos
    console.log("Setting VH");
    var videoCharacter = "";
    if(vh === "rm") {
      videoCharacter = "rhonda-moore-videos/"
      setChatTitle("Rhonda Moore");
      setAgentID(rhondaMooreID);
      setIdleVideo("https://painproject-content.s3.amazonaws.com/rhonda-moore-videos/BF_IDLE.mp4");
    }
    else if (vh === "jt") {
      videoCharacter = "jim-thomas-videos/"
      setChatTitle("Jim Thomas");
      setAgentID(jimThomasID);
      setIdleVideo("https://painproject-content.s3.amazonaws.com/jim-thomas-videos/BM_IDLE.mp4");
    }
    else {
      videoCharacter = "rhonda-moore-videos/"
      setChatTitle("Rhonda Moore");
      setAgentID(rhondaMooreID);
      setIdleVideo("https://painproject-content.s3.amazonaws.com/rhonda-moore-videos/BF_IDLE.mp4");
    }
    setAWSVideoURLBase("https://painproject-content.s3.amazonaws.com/" + videoCharacter);
    console.log(agentID)
    console.log(chatTitle);
    console.log(AWSVideoURLBase)
  }, [AWSVideoURLBase, agentID, chatTitle, vh]);

  useEffect(() => {
    setVH();
    responseVideoRef.current = document.getElementById("responseVideo");
    idleVideoRef.current = document.getElementById("idleVideo");
    dfMessengerRef.current = document.querySelector('df-messenger');
    var lastMessage = getLastInteraction();
    LogMessagesToDB(lastMessage);
    fetchSynthesiaVideo();
  }, [setVH, fetchSynthesiaVideo, getLastInteraction]);
  
  

  return (
    <div className="video-background">
      <video id="responseVideo" className={responseVideoVisibility} key={responseVideoSrc} onEnded={switchToIdle} autoPlay>
        <source src={responseVideoSrc} type="video/mp4" />
        {/* Add additional source elements for different video formats */}
        Your browser does not support the video tag.
      </video>
      <video id="idleVideo" className={idleVideoVisibility} autoPlay muted loop>
        <source src={idleVideo} type="video/mp4" />
        {/* Add additional source elements for different video formats */}
        Your browser does not support the video tag.
      </video>
      <div className="content-overlay">
        {/* Add your content here */}
        <button className="finish-btn" onClick={() => openModal('finished')}>Finished?</button>
        <button className="help-btn" onClick={() => openModal('help')}>?</button>

        <ModalComponent isOpen={isModalOpen} type={modalType} onClose={closeModal} />

        <PatientInfoToggle />
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
        <df-messenger
          intent="WELCOME"
          chat-title={chatTitle}
          agent-id={agentID}
          language-code="en"
          {...(isMinimized ? { minimize: true } : { expand: true })}
        ></df-messenger>
      </div>
    </div>
  );
}

export default Interaction;
