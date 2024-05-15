// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Introduction from './Components/Introduction';
import Interaction from './Components/Interaction';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Introduction/>} />
          <Route exact path='/interaction' element={<Interaction/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
