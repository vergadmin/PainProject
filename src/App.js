// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Introduction from './Components/Introduction';
import Interaction from './Components/Interaction';
import Fiction from './Components/Fiction';
import Transition from './Components/Transition';
import DownloadParticipantData from './Components/ParticipantData';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Introduction/>} />
          <Route exact path='/fiction' element={<Fiction/>} />
          <Route exact path='/transition' element={<Transition/>} />
          <Route exact path='/interaction' element={<Interaction/>} />
          <Route exact path='/ParticipantData' element={<DownloadParticipantData/>} />
        </Routes>
    </Router>
  );
}

export default App;
