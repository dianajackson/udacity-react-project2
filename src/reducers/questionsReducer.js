import {GET_QUESTIONS, CAST_VOTE, ADD_QUESTION} from "../actions/questionActions"
import { _saveQuestion} from '../utils/_DATA.js'

export default function questions (state = {}, action) {
	switch (action.type) {
      	case GET_QUESTIONS:
        	return {
          		...state,
            	...action.questions
        	}
        
      case CAST_VOTE:
        	let user = action.authedUser
            let questionId = action.qid
            let optionOne = state[questionId].optionOne
            let optionTwo = state[questionId].optionTwo
        	let optionOneVotes = state[action.qid].optionOne.votes
            let optionTwoVotes = state[action.qid].optionTwo.votes
            
            if (action.answer === "optionOne") {
              	optionOne.votes = optionOneVotes.concat(user)
            } else {
             	optionTwo.votes = optionTwoVotes.concat(user) 
            }
            
        	return {
              	...state,
              	[action.qid] : {
                	...state[action.qid],
                  	optionOne: optionOne,
                  	optionTwo: optionTwo
                }
            }
        
      case ADD_QUESTION:
      		const question = action.newQuestion
            
      		return {
        		...state,
            	...question
       		}
    
      	default:
        	return state;
    }
}
