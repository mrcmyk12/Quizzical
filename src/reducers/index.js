import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer'
import difficultyReducer from './difficultyReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
   questions: questionsReducer,
   difficulty: difficultyReducer,
   category: categoryReducer
})