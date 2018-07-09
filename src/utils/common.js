import React from 'react';

/** HELPER FUNCTIONS **/

//Takes a user object and returns the first name
function getFirstName(user) {
  	return user.name.split(" ")[0]
}	

/** FUNCTIONAL COMPONENTS **/
export function PollQuestion(props) {
  	let optionOne = props.question.optionOne.text
    let optionTwo = props.question.optionTwo.text
    let displayInline = props.displayInline || false
    let containerClass = displayInline ? "displayInline" : ""
    let optionOneClass = props.pollView ? "question pollView optionOne" : "question"
    let optionTwoClass = props.pollView ? "question pollView optionTwo" : "question"
    
	return (
    	<div className={containerClass}>
        	<span className={optionOneClass}>{optionOne}</span>
          	<span className="orClause"> or </span>
          	<span className={optionTwoClass}>{optionTwo}</span>?
        </div>  
    )
}

export default {getFirstName}


