import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Introduction.css'; // Importing the CSS file
import { Link } from 'react-router-dom';

window.addEventListener("load", async() => {
  const urlParams = new URLSearchParams(window.location.search);
  if(sessionStorage.length < 1 && urlParams.get('participantID') !== null){
    sessionStorage.setItem("participantID", urlParams.get('participantID'));
    var visitID = await getVisitID();
    sessionStorage.setItem("visitID", visitID);
    sessionStorage.setItem("loginTime", new Date().toISOString().slice(0, 19).replace('T', ' '));
  }
});

async function getVisitID(){
  try {
    var participantID = sessionStorage.getItem("participantID");
    const response = await fetch(`/pain/getParticipantVisitID?participantID=${participantID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data.visitID;
  } catch (error) {
    console.error('Error:', error);
  }
}

function Introduction() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [userInput, setUserInput] = useState(sessionStorage.getItem("userPrompt") || '');
  const videoRef = useRef(null);

  const contentItems = [
    { name: 'Pain Disparities', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PainDisparities.mp4' },
    { name: 'Empathy 1', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/Empathy1.mp4' },
    { name: `Gwen's Story`, src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/EmpathyGwen.mp4' },
    { name: `Empathy 2`, src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/Empathy2.mp4' },
    { name: 'Perspective Taking 1', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTaking1.mp4' },
    { name: `Andre's Story`, src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTakingAndre.mp4' },
    { name: 'Perspective Taking 2', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTaking2.mp4' },
    { name: 'Perspective Taking 3', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTaking3.mp4' },
  ];

  const handleNext = async () => {
    if (contentItems[currentContentIndex].name === 'Perspective Taking 2') {
      if(userInput.trim() === ''){
        alert('Please enter a response to Andre before proceeding.');
        return;
      }
      else{
        setUserPrompt(userInput);
      }
    }
    setShowNextButton(false);
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
  };

  function setUserPrompt(userPrompt){
      sessionStorage.setItem("userPrompt", userPrompt);
  };

  async function LogUserInputToDB(){
    try {
      const response = await fetch('/pain/logParticipantVisit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {participantID : sessionStorage.getItem("participantID"), 
            visitID : sessionStorage.getItem("visitID"),
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

  const handlePrevious = () => {
    setShowNextButton(false);
    setCurrentContentIndex((prevIndex) => (prevIndex - 1 + contentItems.length) % contentItems.length);
  };

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
  }, [currentContentIndex]);

  return (
    <div className='introduction'>
      <h1>{contentItems[currentContentIndex].name}</h1>
      <p className="description">Daren, a virtual physician, will give a brief overview on pain disparities, empathy, and perspective-taking. Click the video below to begin.</p>
      <video ref={videoRef} key={contentItems[currentContentIndex].src} height="500" controls>
        <source src={contentItems[currentContentIndex].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
      <div className='col nav-area'>
        {contentItems[currentContentIndex].name === 'Perspective Taking 2' && <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} className={`user-input ${showNextButton ? 'show' : null}`} type="textarea" name="user-input" rows='2' cols='75' placeholder="Type your response to Andre..."/>}
        <div className='button-area'>
          {currentContentIndex !== 0 && <button className='default-btn' onClick={handlePrevious}>◄ Previous: {contentItems[currentContentIndex-1].name}</button>}
          <div className={`hide-buttons ${showNextButton ? 'show' : null}`}>
            {currentContentIndex !== contentItems.length - 1 && <button className='default-btn' onClick={handleNext}>Next: {contentItems[currentContentIndex + 1].name} ►</button>}
            {currentContentIndex === contentItems.length - 1 && <button className='important-btn' onClick={LogUserInputToDB}><Link className="button-link-light" to="/fiction">Continue</Link></button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
