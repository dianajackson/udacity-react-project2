import {SET_CURRENT_USER} from "../actions/currentUserActions"
import {LOGOUT_USER} from "../actions/currentUserActions"

export default function currentUser (state = null, action) {
  	let localStorage_currentUser = localStorage.getItem("currentUser")
    
	switch (action.type) {
    	case SET_CURRENT_USER:
            if (action.userId) {
              	localStorage.setItem("currentUser", action.userId)
            } else if (localStorage_currentUser) {
            	return localStorage_currentUser   
            }
        
        	return action.userId
      
      	case LOGOUT_USER:
        	localStorage.removeItem("currentUser")
        	return null
       	
      	default:
        	return localStorage.getItem("currentUser") || null;
    }
}