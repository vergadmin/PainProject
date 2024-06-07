import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Introduction.css'; // Importing the CSS file
import { Link } from 'react-router-dom';

function Introduction() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [userInput, setUserInput] = useState('');
  const videoRef = useRef(null);

  const contentItems = [
    { name: 'Pain Disparities', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PainDisparities.mp4' },
    { name: 'Empathy 1', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/Empathy1.mp4' },
    { name: `Gwen's Story`, src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/EmpathyGwen.mp4' },
    { name: `Empathy 2`, src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/Empathy2.mp4' },
    { name: 'Perspective Taking 1', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTaking1.mp4' },
    { name: `Daren's Story`, src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTakingDaren.mp4' },
    { name: 'Perspective Taking 2', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTaking2.mp4' },
    { name: 'Perspective Taking 3', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTaking3.mp4' },
  ];

  const handleNext = () => {
    if (contentItems[currentContentIndex].name === 'Perspective Taking 2' && userInput.trim() === '') {
      alert('Please enter a response to Daren before proceeding.');
      return;
    }
    setShowNextButton(false);
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
  };

  const handlePrevious = () => {
    setShowNextButton(false);
    setCurrentContentIndex((prevIndex) => (prevIndex - 1 + contentItems.length) % contentItems.length);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      console.log("IN HANDLE TIME UPDATE")
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
      <p className="description">Daren, a virtual physician "expert," will give a brief talk pain disparities, perspective-taking, and empathy. Click the video below to begin!</p>
      <video ref={videoRef} key={contentItems[currentContentIndex].src} height="500" controls>
        <source src={contentItems[currentContentIndex].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
      <div className={`col nav-area ${showNextButton ? 'show' : null}`}>
        {contentItems[currentContentIndex].name === 'Perspective Taking 2' && <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} className={`user-input ${showNextButton ? 'show' : null}`} type="textarea" name="user-input" rows='2' cols='75' placeholder="Type your response to Daren..."/>}
        <div className={`button-area ${showNextButton ? 'show' : null}`}>
          {currentContentIndex !== 0 && <button className='default-btn' onClick={handlePrevious}>◄ Previous: {contentItems[currentContentIndex-1].name}</button>}
          {currentContentIndex !== contentItems.length - 1 && <button className='default-btn' onClick={handleNext}>Next: {contentItems[currentContentIndex + 1].name} ►</button>}
          {currentContentIndex === contentItems.length - 1 && <button className='important-btn'><Link className="button-link-light" to="/interaction">✔ Begin Patient Interaction</Link></button>}
        </div>
      </div>
    </div>
  );
}

export default Introduction;
