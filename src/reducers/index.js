import { combineReducers } from 'redux'
import questionsReducer from './questionsReducer'
import difficultyReducer from './difficultyReducer'
import categoryReducer from './categoryReducer'
import answersReducer from './answersReducer'
import pointsReducer from './pointsReducer'
import sessionKeyReducer from './sessionKeyReducer'
import responseCodeReducer from './responseCodeReducer'

export default combineReducers({
   questions: questionsReducer,
   difficulty: difficultyReducer,
   category: categoryReducer,
   answers: answersReducer,
   points: pointsReducer,
   sessionKey: sessionKeyReducer,
   response_code: responseCodeReducer
})