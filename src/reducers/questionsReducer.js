import {GET_QUESTIONS, CAST_VOTE, ADD_QUESTION} from "../actions/questionActions"

export default function questions (state = {}, action) {
	switch (action.type) {
      	case GET_QUESTIONS:
        	let localStorage_questions = localStorage.getItem("questions")
            var defaultQuestionSet
            
            if (localStorage_questions) {
            	return JSON.parse(localStorage_questions)
            } 
        
           defaultQuestionSet =  {
          		...state,
            	...action.questions
        	}  
        
            localStorage.setItem("questions", JSON.stringify(defaultQuestionSet))
        	return defaultQuestionSet
        
      case CAST_VOTE:
        	let user = action.authedUser
            let questionId = action.qid
            let optionOne = state[questionId].optionOne
            let optionTwo = state[questionId].optionTwo
        	let optionOneVotes = state[action.qid].optionOne.votes
            let optionTwoVotes = state[action.qid].optionTwo.votes
            var modifiedQuestions
            
            if (action.answer === "optionOne") {
              	optionOne.votes = optionOneVotes.concat(user)
            } else {
             	optionTwo.votes = optionTwoVotes.concat(user) 
            }
            
        	modifiedQuestions = {
              	...state,
              	[action.qid] : {
                	...state[action.qid],
                  	optionOne: optionOne,
                  	optionTwo: optionTwo
                }
            }
        
        	localStorage.setItem("questions", JSON.stringify(modifiedQuestions))
        	return modifiedQuestions
        
      case ADD_QUESTION:
      		const question = action.newQuestion
            let newQuestionSet = {
        		...state,
            	...question
       		}
            
            localStorage.setItem("questions", JSON.stringify(newQuestionSet))
      		return newQuestionSet
    
      	default:
        	return state;
    }
}
