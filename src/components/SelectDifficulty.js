import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { selectDifficulty } from '../actions'


const SelectDifficulty = (props) => {
   console.log(props)
   return(
      <div>
         <button onClick={() => selectDifficulty('easy')}>Easy</button>
         <button onClick={() => selectDifficulty('medium')}>Medium</button>
         <button onClick={() => selectDifficulty('hard')}>Hard</button>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {difficulty: state.difficulty}
}


export default connect(mapStateToProps, {
   selectDifficulty: selectDifficulty
})(SelectDifficulty)