import React, {Component} from "react"
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {NavLink} from "react-router-dom"
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {PollQuestion} from "../utils/common"

/** Functional Components **/
function PollQuestionActionButtons(props) {
  	let question = props.question
    let questionId = question.id
    let showVoteButton = props.showVoteButton || false
    let VoteButton = showVoteButton ? <Button variant="contained" size="small" color="secondary">CAST YOUR VOTE!</Button> : ""
    
	return (
    	<NavLink to={'/question/' + question.id} className="">
      		<IconButton aria-label="View Poll Results" className="midMarginRight">
      			<i title="View Poll Results" className="material-icons">visibility</i>
      		</IconButton>
    		{VoteButton}
      </NavLink>
    )  
}

function TabContainer({ children, dir }) {
  	return (
    	<div>{children}</div>
  	);
}

class Dashboard extends Component {
	state = {
   	 	value: 0,
  	};

	handleChange = (event, value) => {
    	this.setState({ value });
  	};

  	handleChangeIndex = index => {
    	this.setState({ value: index });
  	};
 
 	render() {
      	const currentUser = this.props.currentUser
      	const questions = this.props.questions
      	var answeredQuestions = [];
      	var unansweredQuestions = [];
      	var usersThatVoted;
      	var answeredQuestionsByDate = [];
      	var unansweredQuestionsByDate = [];
      
      	function sortByTimestamp(a, b) {
      		a = a.timestamp;
      		b = b.timestamp;
      
      		if (a > b) {
      			return -1;
    		}

			if (a < b) {
             	return 1; 
            }

			return 0;
    	}
      
      	Object.keys(questions).forEach((questionId) => {
      		var question = questions[questionId]
      
      		usersThatVoted = [...question.optionOne.votes, ...question.optionTwo.votes]
			if (usersThatVoted.length && usersThatVoted.find(user => user === currentUser)) {
      			answeredQuestions.push(questionId)
              	answeredQuestionsByDate.push(question)
            } else {
      			unansweredQuestions.push(questionId)
                unansweredQuestionsByDate.push(question)
            }
    	})

        // Sort by dates
        answeredQuestionsByDate.sort(sortByTimestamp)
        unansweredQuestionsByDate.sort(sortByTimestamp)

    	return (
        	<div id="dashboard">
          		<AppBar position="static" color="default">
          			<Tabs className="dashboardTabs"
            			value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth>
                      <Tab label={"We're Awaiting Your Response (" + unansweredQuestions.length + ")"} />
                      <Tab label={"Answered Questions (" + answeredQuestions.length + ")"} />
          			</Tabs>
        		</AppBar>
             
                <SwipeableViews
                	index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer>
          				<h2>Would You Rather...</h2>
          				<ol>
          					{Object.keys(unansweredQuestionsByDate).map((ndx) => {
                                var question = unansweredQuestionsByDate[ndx]
                                var formattedTimestamp = new Date(question.timestamp).toLocaleString();

                                return <li key={question.timestamp}>
          							<PollQuestionActionButtons question={question} showVoteButton={true}/>
                                  	<PollQuestion question={question} colorCode={false}/>
          							<small className="formattedTimestamp">Posted {formattedTimestamp}</small></li>
                            })}
						</ol>
          			</TabContainer>
                    <TabContainer>
						<h2>Would You Rather...</h2>
          				<ol>
          					{Object.keys(answeredQuestionsByDate).map((ndx) => {
                                var question = answeredQuestionsByDate[ndx]
                                var formattedTimestamp = new Date(question.timestamp).toLocaleString();

                                return <li key={question.timestamp}>
          							<PollQuestionActionButtons question={question} displayInline={true} showVoteButton={false}/>
                                    <PollQuestion question={question} displayInline={true}/>
          							<small className="formattedTimestamp">Posted {formattedTimestamp}</small></li>
                            })}
						</ol>
					</TabContainer>
        		</SwipeableViews>
          	</div>  
          )
    }
}

export default (Dashboard)