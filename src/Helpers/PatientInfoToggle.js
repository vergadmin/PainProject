import React, { useState } from 'react';
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import '../CSS/PatientInfoToggle.css';

function PatientInfoToggle() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const tempMessage = () => {
    alert("We have not implemented this button's functionality yet. Stay tuned! :)")
  }

  return (
    <div className="patient-info-toggle">
      <div className={`box ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {isExpanded ? (
          <div>
            <div className="row info-top" onClick={toggleExpanded}>
              <div className="col">
                <h2 className="patient-info-title">Rhonda Moore</h2>
                <p className="patient-info-subtitle">Click to hide patient information.</p>
              </div>
              <FaCircleArrowUp size={31} />
            </div>
            <div className="expansion-area">
              <div className="row">
                <img className="profile" src="https://painproject-content.s3.amazonaws.com/images/Rhonda+Moore+Profile.png" alt="Rhonda Moore"/>
                <div className="col">
                  <p className="info">Age: 24</p>
                  <p className="info">Gender: Female</p>
                </div>
              </div>
              <p className="info-section">Description</p>
              <p className="info">The purpose of this interview is to better understand the patient’s pain and how it is affecting their life.</p>
              <p className="info-section">Scope</p>
              <p className="info">Domain/Topics to ask questions about may include:</p>
              <ul>
                <li>How the pain started</li>
                <li>Pain Rating</li>
                <li>Treatment use</li>
                <li>Substance use</li>
                <li>Other medical issues</li>
                <li>Family Medical History</li>
                <li>How pain affects: Work, Family, Social, Mood, Sleep, Appetite/Weight</li>
              </ul>
              <hr/>
              {/* <div className='row'>
                <button className="important-btn" onClick={tempMessage}>Need Help?</button>
                <button className="important-btn" onClick={tempMessage}>Finished?</button>
              </div> */}
            </div>
          </div>
        ) : (
          <div>
            <div className="row info-top" onClick={toggleExpanded}>
                <div className="col">
                  <h2 className="patient-info-title">Rhonda Moore</h2>
                  <p className="patient-info-subtitle">Click for more patient information.</p>
                </div>
                <FaCircleArrowDown size={31} />
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientInfoToggle;
