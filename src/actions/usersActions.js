export const GET_USERS = "GET_USERS"

/**ACTION CREATORS**/
export function getUsers(users) {
	return {
     	type: GET_USERS,
      	users,
    }
}