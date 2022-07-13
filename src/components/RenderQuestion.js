import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { fetchQuestions } from '../actions'
import RenderAnswers from './RenderAnswers'

const RenderQuestion = ({questions}) => {

   const [count, setCount] = useState(0)
   const [wrongAnswers, setWrongAnswers] = useState([])

   

   if(!questions[0]){
      return <div></div>
   }

   const renderAnswers = ()=> {
return (
      wrongAnswers.map(wrongAnswers.map((answer) => {
         return(<div>{answer}</div>)
      })))
   }

   return(
      <div>
         {questions[count].question}
         <button onClick={() => {setCount(count + 1); setWrongAnswers(questions[count].incorrect_answers) }}>Next Question</button>
         <RenderAnswers wrongAnswers={questions[count].incorrect_answers} correctAnswer={questions[count].correct_answer}/>
      </div>
   )
}

export default RenderQuestion