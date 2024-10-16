// Fiction.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Interaction.css'; // Importing the CSS file
import '../CSS/Fiction.css'; // Importing the CSS file
import { Link } from 'react-router-dom';
// import {baseAPIURL} from '../Helpers/ConversationLogging';
import {LogUserInputToDB} from '../Helpers/ConversationLogging';

// async function LogUserInputToDB(){
//   try {
//     const response = await fetch(`${baseAPIURL}/pain/logParticipantVisit`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(
//         {participantID : sessionStorage.getItem("participantID"), 
//           visitID : sessionStorage.getItem("visitID"),
//           vh : sessionStorage.getItem("vh"),
//           loginTime : sessionStorage.getItem("loginTime"),
//           userPrompt: sessionStorage.getItem("userPrompt")
//       })
//     });
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

const Fiction = () => {
  const contentItems = [
    { title: "Training Developer Responsibilities", subTitle: "What will the training developers do?", content: ["Create goal-oriented, practical simulations based on measurable learning objectives.", "Add enough realism to each simulation so the learner receives enough clues to identify and solve a problem.", "Set and maintain an engaging learning environment.", "Foster reflective practice."]},
    { title: "Learner Responsibilities", subTitle: "What do I need to do?", content: ["Suspend judgment of realism for any given simulation in exchange for the promise of learning new and reinforcing existing knowledge and skills.", "Maintain a genuine desire to learn even when suspending disbelief becomes difficult.", "Treat the simulated patients with the same care and respect as an actual patient."] },
    { title: "Top 3 Things to Remember", subTitle: "What should I remember?", content: ["Our Basic Assumption: “We believe that everyone participating in these sessions is intelligent, capable, cares about doing their best, and wants to improve how they care for patients.”", "Areas of strengths and weakness identified by these simulations are intended as constructive feedback, not criticism.", "The “Vegas” Rule – What happens here, stays here. Your responses will NOT be shared outside of this session. All results will be anonymized and pooled before disseminating them to the broader scholarly community."]},
    { title: "Are you ready to begin?", subTitle: "", content: ["I'm ready to begin!"]},
    { title: "Final Instructions from Daren", subTitle: "You are about to interact with the virtual patient. Here are some final instructions from Daren.", content: ["https://painproject-content.s3.amazonaws.com/didactic-agent/PatientTransition.mp4"]}
];

    const headerItems = [
        {header: "Healthcare Simulation Fiction Contract", subText1: "The purpose of simulation-based training in healthcare is to help participants solidify their skills for working with actual patients. The developers of this training have recreated realistic patient care situations using patient simulations. The realism of each simulation may vary depending on the learning goals for the session. The simulated patients and environment have certain limitations in their ability to mirror real life exactly.", subText2: "When participating in these simulations, you assume all aspects of a practicing healthcare clinician’s professional behavior. Additionally, when a gap occurs between simulated reality and actual reality, you are expected to try to understand the goals of the learning session and behave accordingly."},
        {header: "Please read the following before beginning.", subText1: "In the next section, you will interact with two virtual patients with chronic pain. Your goal for these interactions is to understand better how pain can affect your patients’ lives from their perspective. You will have up to 10 minutes to interact with each patient. You don’t have to use the entire 10 minutes, but you should aim to spend enough time with each patient to consider their lived experience.", subText2: "You may ask them specific questions about their pain, when it started, its severity, and any treatments they have tried. However, for this training session, try to focus your conversation more on how their pain is affecting different aspects of their lives, such as their family, work, and daily routine. Try practicing the empathy and perspective-taking techniques introduced in this training."}
    ]

  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Array(contentItems[0].content.length).fill(false));
  const videoRef = useRef(null);
  console.log(sessionStorage)


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
  const navigate = useNavigate();

  const handleCheckboxChange = (index) => {
    setCheckedItems(prevState => {
      const newCheckedItems = [...prevState];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleNext = () => {
    if (checkedItems.every(item => item)) {
      const nextIndex = currentContentIndex + 1;
      if (nextIndex >= contentItems.length) {
            navigate('/transition'); // Navigate to /interaction after all content items
      } else {
        setCheckedItems(new Array(contentItems[nextIndex].content.length).fill(false)); // Reset checkboxes for the next item
        setCurrentContentIndex(nextIndex);
      }
    }
    if (currentContentIndex === 0) {
      const nextIndex = currentContentIndex + 1;
      setCurrentContentIndex(nextIndex);
    }
  };

  const canProceed = checkedItems.every(item => item);

  const { title, subTitle, content } = contentItems[currentContentIndex];
  const { header, subText1, subText2} = headerItems[0];

  if (currentContentIndex === (contentItems.length - 1)) {
    return (
      <div className = 'fiction'>
        <h1>{contentItems[currentContentIndex]['title']}</h1>
        <p className="description">{contentItems[currentContentIndex]['subTitle']}</p>
        <video autoPlay ref={videoRef} key={contentItems[currentContentIndex].src} controls>
          <source src={contentItems[currentContentIndex].content[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video> 
        <div className={`hide-buttons ${showNextButton ? 'show' : null}`}>
          <button className='important-btn pulse'><Link className="button-link-light" to="/interaction" onClick={() => LogUserInputToDB()}>✔ Begin Patient Interaction</Link></button>
        </div>
      </div>
    );
  } else {
    return (
      <div className = 'fiction'>
        <h1>{header}</h1>
        <div className="info-box">
        <p className="fiction-description">{subText1}</p>
        <p className="fiction-description">{subText2}</p>
        </div>
        <h2 style={{ marginBottom: '0px'}}>{title}</h2>
        <h3>{subTitle}</h3>
        <div className='checkbox-area'>
          {content.map((item, index) => (
            <div key={index} className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <label className="checkbox-label">
                {item}
              </label>
            </div>
          ))}
        </div>
        <br/>
        <p>Please check all boxes above to continue.</p>
        <button onClick={handleNext} className = "default-btn" disabled={!canProceed}>
          Next
        </button>
      </div>
    );
  }
};


export default Fiction;
