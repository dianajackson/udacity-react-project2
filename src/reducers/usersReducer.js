import {GET_USERS} from "../actions/usersActions"
import {UPDATE_USER_ANSWERS, UPDATE_USER_QUESTIONS} from "../actions/usersActions"

export default function users (state = {}, action) {
  	var modifiedUsers
    
	switch (action.type) {
      	case GET_USERS:
        	let localStorage_users = localStorage.getItem("users")
            var defaultUsersSet
            
            if (localStorage_users) {
            	return JSON.parse(localStorage_users)
            } 
        
        	defaultUsersSet = {
          		...state,
            	...action.users
        	}
        
            localStorage.setItem("users", JSON.stringify(defaultUsersSet))
        	return defaultUsersSet
        	
        
         case UPDATE_USER_ANSWERS:
        	let authedUser = action.answer.authedUser
            let answers = Object.assign({}, state[authedUser].answers)
            answers[action.answer.qid] = action.answer.answer
        
        	modifiedUsers = {
            	...state,
              	[authedUser] : {
                	...state[authedUser],
                  	answers: answers
                }
            }
        
            localStorage.setItem("users", JSON.stringify(modifiedUsers))
        	return modifiedUsers
        
        case UPDATE_USER_QUESTIONS:
        	var questions
            
        	authedUser = action.question.author
            questions = state[authedUser].questions
        
        	modifiedUsers = {
            	...state,
              	[authedUser] : {
                	...state[authedUser],
                  	questions: questions.concat(action.question.id)
                }
            }
        
            localStorage.setItem("users", JSON.stringify(modifiedUsers))
        	return modifiedUsers

                	
      default:
        return state;
    }
}
