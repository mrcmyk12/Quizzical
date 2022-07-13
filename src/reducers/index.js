import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer'
import difficultyReducer from './difficultyReducer'
import categoryReducer from './categoryReducer'
import answersReducer from './answersReducer'
import pointsReducer from './pointsReducer'

export default combineReducers({
   questions: questionsReducer,
   difficulty: difficultyReducer,
   category: categoryReducer,
   answers: answersReducer,
   points: pointsReducer
})