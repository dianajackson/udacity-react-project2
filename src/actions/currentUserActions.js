export const GET_CURRENT_USER = "GET_CURRENT_USER"
export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const LOGOUT_USER = "LOGOUT_USER"

export function getCurrentUser(userId) {
	return {
     	type: GET_CURRENT_USER,
      	userId,
    }
}

export function setCurrentUser(userId) {
	return {
     	type: SET_CURRENT_USER,
      	userId,
    }
}

export function logoutUser() {
	return {
     	type: LOGOUT_USER
    }
}