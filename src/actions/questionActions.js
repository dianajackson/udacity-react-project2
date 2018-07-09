import { _saveQuestionAnswer} from '../utils/_DATA.js'
import { _saveQuestion} from '../utils/_DATA.js'

export const ADD_QUESTION = "ADD_QUESTION"
export const GET_QUESTIONS = "GET_QUESTIONS"
export const CAST_VOTE = "CAST_VOTE"

/**ACTION CREATORS**/
export function getQuestions(questions) {
	return {
     	type: GET_QUESTIONS,
      	questions,
    }
}

export function castVote({authedUser, qid, answer}) {
	return {
     	type: CAST_VOTE,
      	authedUser,
      	qid,
      	answer
    }
}

export function addQuestion(question) {    
    let newQuestion = {}
    newQuestion[question.id] = question
            
	return {
     	type: ADD_QUESTION,
      	newQuestion
    }
}

export function handleCastVote(info) {
	return(dispatch) => {
    	dispatch(castVote(info))  
      	return _saveQuestionAnswer(info)
      		.catch((e) => {
          		console.warn("Error|handleCastVote: ", e)
          		dispatch(castVote(info))
          		alert("An error occurred while casting the vote.")
        	})
    }
}

export function handleAddQuestion(info) {
	return(dispatch, getState) => {    	
      	return _saveQuestion(info)
      		.then((savedQuestion) => {
          		dispatch(addQuestion(savedQuestion))
        	}).catch((e) => {
          		console.warn("Error|handleAddQuestion: ", e)
          		dispatch(addQuestion(info))
          		alert("An error occurred while adding the new question.")
        	})
    }
}