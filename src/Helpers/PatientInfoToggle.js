import React, { useEffect, useState, useCallback } from 'react';
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import '../CSS/PatientInfoToggle.css';

function PatientInfoToggle() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const [profilePhoto, setProfilePhoto] = useState ("RhondaMooreProfile.png");
  const [age, setAge] = useState ("24");
  const [gender, setGender] = useState ("Female");
  const [name, setName] = useState("Rhonda Moore");
  const vh = sessionStorage.getItem("vh");

  useEffect(() => {
    setVH();
  })

  const setVH = useCallback(() => {
    // Determine Base URL Videos
    if(vh === "rm") {
      setProfilePhoto("https://painproject-content.s3.amazonaws.com/images/RhondaMooreProfile.png");
      setAge("24");
      setGender("Female");
      setName("Rhonda Moore");
    }
    else if (vh === "jt") {
      setProfilePhoto("https://painproject-content.s3.amazonaws.com/images/JimThomasProfile.png")
      setAge("37");
      setGender("Male");
      setName("Jim Thomas");
    }
    else {
      setProfilePhoto("https://painproject-content.s3.amazonaws.com/images/RhondaMooreProfile.png");
      setAge("24");
      setGender("Female");
      setName("Rhonda Moore");
    }
  }, [vh]);


  return (
    <div className="patient-info-toggle">
      <div className={`box ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {isExpanded ? (
          <div>
            <div className="row info-top" onClick={toggleExpanded}>
              <div className="col">
                <h2 className="patient-info-title">{name}</h2>
                <p className="patient-info-subtitle">Click to hide patient information.</p>
              </div>
              <FaCircleArrowUp size={31} />
            </div>
            <div className="expansion-area">
              <div className="row">
                <img className="profile" src={profilePhoto} alt={name}/>
                <div className="col" style={{alignItems: 'flex-start'}}>
                  <p className="info">Age: {age}</p>
                  <p className="info">Gender: {gender}</p>
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
            </div>
          </div>
        ) : (
          <div>
            <div className="row info-top" onClick={toggleExpanded}>
                <div className="col">
                  <h2 className="patient-info-title">{name}</h2>
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
