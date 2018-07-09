import React, {Component} from "react"
import {handleCastVote} from "../actions/questionActions"
import CardContent from '@material-ui/core/CardContent';
import util from "../utils/common"
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import {PollQuestion} from "../utils/common"
import { renderToString } from 'react-dom/server'
import Button from '@material-ui/core/Button';
import {connect} from "react-redux"

function CardHeader(props) {
  	let question = props.question
    let formattedQuestion = (<PollQuestion question={question} pollView={true}/>)    
    var title = "Would You Rather..."
    
  	return (
    	<div className="cardHeader">
      		<div className="cardTitle">{title}</div>
      		<div className="cardSubtitle">{formattedQuestion}</div>
      	</div>
    )
}

function QuestionOptions(props) {
  	const votingButtonText = "I Choose This One"
    let {question, totalUsers, currentUser, dispatch} = props
    let youClause = ""
    var optionOneData, optionTwoData
    let userHasVoted = question.optionOne.votes.includes(currentUser) || question.optionTwo.votes.includes(currentUser)
  	let votingContainerClass = userHasVoted ? "votingContainer hidden" : "votingContainer"
    
    function setOptionData(data) {
    	let optionData = {}
        let totalVoters = data.votes.length
        let currentUserVoted = false
        let wouldRatherClause = ""
        var resultsString
        let votingPercentage = "0%"
      
        if (totalVoters) {
          	votingPercentage = (Math.round((totalVoters/totalUsers) * 100)).toString() + "%"
          
          	if (data.votes.includes(currentUser)) {
              	currentUserVoted = true
        		totalVoters--
              	
              	if (!totalVoters) {
              		resultsString = " are the only one that "    
                } else {
                	resultsString = " and " + totalVoters + (totalVoters === 1 ? " other person " : " others")
                }
              
              	// Change it back
              	totalVoters++
          	} else {
              	resultsString = totalVoters + (totalVoters === 1 ? " person " : " people")
            }
          
        	resultsString += " would rather "
          	wouldRatherClause = data.text + "!"
        } else {
        	resultsString = "No one has voted for this option yet!"  
        }
      
      	return {
        	votingPercentage: votingPercentage,
          	totalVoters: totalVoters,
          	currentUserVoted: currentUserVoted,
          	resultsString: resultsString,
          	wouldRatherClause: wouldRatherClause,
          	youClause: currentUserVoted ? "You" : ""
        }
    }
  
    function processVote(answer) {
  		dispatch(handleCastVote({authedUser: currentUser, qid: question.id, answer: answer}))	
    }
  
  	optionOneData = setOptionData(question.optionOne)
  	optionTwoData = setOptionData(question.optionTwo)
    
	return (
    	<div className="questionOptionBoxes">
			<div className="optionOne">
            	<div className={votingContainerClass}>
     				<Button className="votingButton" onClick={(e) => processVote("optionOne")}>
						{votingButtonText}
                  	</Button> 
      			</div>
      			<div className="votingPercentage">{optionOneData.votingPercentage}</div>
      			<div>
      				<span className="youClause">{optionOneData.youClause}</span>
      				{optionOneData.resultsString}
      				<span className="wouldRatherClause">{optionOneData.wouldRatherClause}</span>
      			</div>
      		</div>
      		<div className="optionTwo">
				<div className={votingContainerClass}>
     				<Button className="votingButton" onClick={(e) => processVote("optionTwo")}>
						{votingButtonText}
                  	</Button> 
      			</div>
      			<div className="votingPercentage">{optionTwoData.votingPercentage}</div>
            	<div>
            		<span className="youClause">{optionTwoData.youClause}</span>
      				{optionTwoData.resultsString}
      				<span className="wouldRatherClause">{optionTwoData.wouldRatherClause}</span>
      			</div>
      		</div>
      	</div>
    )
}

class PollCard extends Component {
 	render() {   
      	const {question, totalUsers, currentUser, dispatch} = this.props
        
    	return (
      		<div className="pollCard">
                <Card>
                	<CardContent>
                      	<div> 
                          	<CardHeader question={question}/>
          					<QuestionOptions question={question} totalUsers={totalUsers} currentUser={currentUser} dispatch={dispatch}/>
                      	</div>
                  	</CardContent>
          		</Card>
			</div>
          )
    }
}

export default connect()(PollCard)