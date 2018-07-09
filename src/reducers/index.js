import {combineReducers} from "redux"
import users from "./usersReducer"
import currentUser from "./currentUserReducer"
import questions from "./questionsReducer"
import dataLoadState from "./commonReducer"

export default combineReducers({
	users,
  	currentUser,
  	questions,
  	dataLoadState
})