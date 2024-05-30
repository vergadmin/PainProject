// Interaction.js
import React, { useEffect, useState, useRef } from 'react';
import '../CSS/Interaction.css'; // Importing the CSS file
import PatientInfoToggle from '../Helpers/PatientInfoToggle';

function Interaction() {
  const [responseVideoSrc, setResponseVideoSrc] = useState('responseVideo');
  const [responseVideoVisibility, setResponseVideoVisibility] = useState('hide')
  const [idleVideoVisibility, setIdleVideoVisibility] = useState('show')

  // Function to handle video source change
  const changeVideoSource = (newSrc) => {
    console.log("TRIGGERED", newSrc)
    setResponseVideoSrc(newSrc);
    setResponseVideoVisibility('show')
    setIdleVideoVisibility('hide')
    console.log("RESPONSE VIDEO:", responseVideo)
    console.log("IDLE VIDEO:", idleVideo)
  };

  const switchToIdle = () => {
    console.log("SWITCHING BACK TO IDLE")
    setResponseVideoVisibility('hide')
    setIdleVideoVisibility('show')
  };

  var responseVideo = ''
  var idleVideo = ''
  var dfMessenger = ''

  useEffect(() => {
    responseVideo = document.getElementById("responseVideo");
    idleVideo = document.getElementById("idleVideo");
    dfMessenger = document.querySelector('df-messenger'); 
    fetchSynthesiaVideo()
  }, []);

  const fetchSynthesiaVideo = () => {
    //find dfMessenger declared in html file
    dfMessenger.addEventListener('df-response-received', function (event) {

      var displayName = event.detail.response.queryResult.intent.displayName;

      var queryText = event.detail.response.queryResult.queryText;

      //fulfillmentText is what Dialogflow sent back
      var queryFufillmentText = event.detail.response.queryResult.fulfillmentText;

      //make AWS video link
      displayName = displayName.replaceAll(" ", "");
      displayName = displayName.replaceAll("/", "_");
      console.log(displayName);
      //change this to link to AWS Repo for scenario videos
      var AWS_videoURL_Base = "https://painproject-content.s3.amazonaws.com/rhonda-moore-videos/";
      var videoURL = AWS_videoURL_Base + displayName + ".mp4";
      changeVideoSource(videoURL)
    });
  }

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
          expand
        ></df-messenger>
      </div>
    </div>
  );
}

export default Interaction;
