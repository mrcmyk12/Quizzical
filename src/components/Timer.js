import React, {useEffect, useState} from 'react'

const Timer = () => {

   const [seconds, setSeconds] = useState(0)
   const [minutes, setMinutes] = useState(0)

   var timer;

   useEffect(() => {
      timer = setInterval(() => {
         setSeconds(seconds+1);

         if(seconds===59){
            setMinutes(minutes+1)
            setSeconds(0);
         }
      },1000)

      return ()=>clearInterval(timer)
   })

   return(
      <div>
         <h1>{minutes}:{seconds}</h1>
      </div>
   )
}

export default Timer