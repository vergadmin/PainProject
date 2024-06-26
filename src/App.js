// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Introduction from './Components/Introduction';
import Interaction from './Components/Interaction';
import Fiction from './Components/Fiction';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Introduction/>} />
          <Route exact path='/fiction' element={<Fiction/>} />
          <Route exact path='/interaction' element={<Interaction/>} />
        </Routes>
    </Router>
  );
}

export default App;
