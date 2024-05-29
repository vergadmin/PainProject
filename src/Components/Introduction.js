// Introduction.js
import React, { useState } from 'react';
import '../CSS/Introduction.css'; // Importing the CSS file

function Introduction() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const contentItems = [
    { name: 'Pain Disparities', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PainDisparities.mp4' },
    { name: 'Empathy', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/Empathy.mp4' },
    { name: 'Perspective Taking', src: 'https://painproject-content.s3.amazonaws.com/didactic-agent/PerspectiveTaking.mp4' },
  ];

  const handleNext = () => {
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
  };

  const handlePrevious = () => {
    setCurrentContentIndex((prevIndex) => (prevIndex - 1 + contentItems.length) % contentItems.length);
  };



  return (
    <div className='introduction'>
      <h1>Introduction to {contentItems[currentContentIndex].name}</h1>
      <p className="description">Daren, a virtual physician "expert," will give a brief talk pain disparities, perspective-taking, and empathy. Click the video below to begin!</p>
      <br/>
      <video key={contentItems[currentContentIndex].src} height="650" controls>
          <source src={contentItems[currentContentIndex].src} type="video/mp4" />
          Your browser does not support the video tag.
      </video> 
      <div className='button-area'>
        {currentContentIndex !== 0 && <button className='previous' onClick={handlePrevious}>◄ Previous: {contentItems[currentContentIndex-1].name}</button> }
        {currentContentIndex !== contentItems.length-1 && <button className='next' onClick={handleNext}>Next: {contentItems[currentContentIndex+1].name} ►</button> }
      </div>
    </div>
  );
}

export default Introduction;
