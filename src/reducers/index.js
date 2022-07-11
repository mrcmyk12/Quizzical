import { combineReducers } from 'redux'
import { fetchQuestions } from '../actions'
import questionsReducer from './questionsReducer'
import difficultyReducer from './difficultyReducer'

export default combineReducers({
   questions: questionsReducer,
   difficulty: difficultyReducer
})