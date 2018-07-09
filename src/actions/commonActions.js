import { _getUsers, _getQuestions } from '../utils/_DATA.js'

/** IMPORT ACTION CREATORS **/
import {getQuestions} from "./questionActions.js"
import {getUsers} from "./usersActions.js"
import {setCurrentUser} from "./currentUserActions.js"

export const DATA_LOAD_NOT_STARTED = "DATA_LOAD_NOT_STARTED"
export const DATA_LOAD_STARTED = "DATA_LOAD_STARTED"
export const DATA_LOAD_FINISHED = "DATA_LOAD_FINISHED"

export function setDataLoadState(dataLoadStatus) {
  	var actionType
    
  	switch(dataLoadStatus) {
      	case "started":
      		actionType = DATA_LOAD_STARTED
        	break
        
      	case "finished":
        	actionType = DATA_LOAD_FINISHED
      		break
        
      	default:
        	actionType = DATA_LOAD_NOT_STARTED
    }
  
	return {
     	type: actionType,
      	dataLoadStatus
    }
}

export function loadData() {
	return (dispatch) => {
    	_getQuestions()
      		.then((questions) => {          
		    	return _getUsers()
      				.then((users) => {
                  		console.log("...............initial dispatch")
                  		dispatch(setDataLoadState("started"))
                        dispatch(getQuestions(questions))
          				dispatch(getUsers(users))
          				dispatch(setCurrentUser(null))
                  		dispatch(setDataLoadState("finished"))
        			})  
      		})
    }
}