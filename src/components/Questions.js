import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { fetchQuestions } from '../actions'



const Questions = (props) => {

   useEffect(() => {
      props.fetchQuestions("9","hard");
    },[]);
   
   console.log(props)
   return (
      <div>
         Questions Go Here
      </div>
   )
}

const mapStateToProps = (state) => {
   return {questions: state.questions}
}

export default connect(mapStateToProps, {
   fetchQuestions:fetchQuestions
})(Questions)