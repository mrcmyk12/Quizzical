import { combineReducers } from 'redux'
import { fetchQuestions } from '../actions'
import questionsReducer from './questionsReducer'

export default combineReducers({
   questions: questionsReducer
})