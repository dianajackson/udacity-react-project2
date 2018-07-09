export const GET_USERS = "GET_USERS"
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS"
export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS"

/**ACTION CREATORS**/
export function getUsers(users) {
	return {
     	type: GET_USERS,
      	users,
    }
}

export function updateUserAnswers(answer) {
 	return {
    	type: UPDATE_USER_ANSWERS,
      	answer
    }
}

export function updateUserQuestions(question) {
 	return {
    	type: UPDATE_USER_QUESTIONS,
      	question
    }
}