import {SET_CURRENT_USER} from "../actions/currentUserActions"
import {LOGOUT_USER} from "../actions/currentUserActions"

export default function currentUser (state = null, action) {
	switch (action.type) {
    	case SET_CURRENT_USER:
        	return action.userId
      
      	case LOGOUT_USER:
        	localStorage.setItem("currentUser", null)
        	return null
        
      	default:
        	return localStorage.getItem("currentUser") || null;
    }
}