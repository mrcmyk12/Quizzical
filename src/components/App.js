import React from 'react'
import Questions from './Questions'
import "../Styles/Questions.css"
import {Routes, Route } from 'react-router-dom'
import Home from './Home'


const App = () => {
   return(
      <div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Questions" element={<Questions />} />
         </Routes>
      </div>
   )
}

export default App