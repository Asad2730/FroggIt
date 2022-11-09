import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SendNotify from './screens/sentNotify'
import GetNotify from './screens/getNotify'



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SendNotify />} />
          <Route path="/recive" element={<GetNotify />} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;


