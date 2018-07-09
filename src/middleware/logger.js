const logger = (store) => (next) => (action) => {
	const returnValue = next(action)
    
    console.group(action.type)
  		console.log(store.getState())
  	console.groupEnd()
  
  	return returnValue
}

export default logger