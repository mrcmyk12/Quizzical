import React,{useEffect, useState} from 'react'

const RenderAnswers = ({wrongAnswers, correctAnswer}) => {

   const [jumbledAnswers, setJumbledAnswers] = useState(["no answers"])

   useEffect(() => {
      jumble();
      console.log(jumbledAnswers);
   },[])

   const jumble = ()=>{

      jumbledAnswers.pop();

      wrongAnswers.map((answer) => {
         jumbledAnswers.push(answer)
      })

      jumbledAnswers.push(correctAnswer)

   }

    const getRandomInt = (max) => {
      return Math.floor(Math.random * max)
    }

   const renderAnswers = wrongAnswers.map((answer)=> {
      return(
         <div key={correctAnswer.indexOf(answer)}>{answer}</div>
      )
   })

   return(
      <div>
         {renderAnswers}
      </div>
   )
}

export default RenderAnswers