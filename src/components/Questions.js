import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { fetchQuestions } from '../actions'
import SelectDifficulty from './SelectDifficulty'
import SelectCategory from './SelectCategory'




const Questions = (props) => {
   
   console.log(props)
   return (
      <div>
         <SelectDifficulty />
         <SelectCategory />
      </div>
   )
}

const mapStateToProps = (state) => {
   return {difficulty: state.difficulty}
}

export default connect(mapStateToProps)(Questions)