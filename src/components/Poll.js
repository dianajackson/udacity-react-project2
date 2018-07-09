import React, {Component} from "react"
import Button from '@material-ui/core/Button';
import {connect} from "react-redux"
import AvatarCard from './AvatarCard';
import PollCard from './PollCard';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import {handleAddQuestion} from "../actions/questionActions"

/** Functional Components **/
function ErrorMessage() {   
	return (
      	<div className="pollError">
      		<i className="material-icons red">error</i>
      		<div>Invalid Poll</div>
      	</div>
    )
}

class Poll extends Component {
	state = {
   	 	value: 0,
      	showError: false
  	};

	handleChange = (event, value) => {
    	this.setState({ value });
  	};

	handleClose = () => {
    	this.setState({ showError: false });
  	};

	validateNewPoll = (currentUser, dispatch, history) => {
      	let optionOneText = document.getElementById("optionOneInput").value
        let optionTwoText = document.getElementById("optionTwoInput").value
      	if (!optionOneText || !optionTwoText) {
    		this.setState({ showError: true });
        } else {
        	dispatch(handleAddQuestion({author:currentUser, optionOneText: optionOneText, optionTwoText: optionTwoText}))  
          	history.push("/")
        }
  	};

 	render() {
      	var content, isNewPoll
      	let {questions, users, currentUser, cardType, dispatch, history} = this.props
      	const questionId = this.props.match.params.questionId
      
		cardType = cardType || "pollDetails"
		isNewPoll = (cardType === "newPoll")

		if (this.props.dataLoadState !== "finished") {
			return(<div>Waiting</div>)      
    	}

		let user = users[currentUser]

		if (isNewPoll || questions.hasOwnProperty(questionId)) {
          	let question = questions[questionId]
            let author = isNewPoll ? user : users[question.author]
          
          	if (isNewPoll) {
          		content = (
          			<div className="pollContainer">
          				<AvatarCard user={author} cardType={cardType} />
						<Card className="contentPanel">
							<CardContent>
								<h2>Would You Rather...</h2>
								<form>
									<TextField
                                      id="optionOneInput"
                                      label="What's the 1st Option?"
                                      InputLabelProps={{
                                                       shrink: true,
                                                      }}
                                      placeholder=""
                                      fullWidth
                                      margin="normal"
        							/>
									<TextField
                                      id="optionTwoInput"
                                      label="What's the 2nd Option?"
                                      InputLabelProps={{
                                                       shrink: true,
                                                      }}
                                      placeholder=""
                                      fullWidth
                                      margin="normal"
        							/>
                              <Snackbar
                                  open={this.state.showError}
                                  autoHideDuration={5000}
                                  onClose={this.handleClose}
                                  ContentProps={{
                                    'aria-describedby': 'snackbar-fab-message-id'
                                  }}
                                  message={<span id="snackbar-fab-message-id">You must enter both options</span>}
                                  action={
                                    <Button color="inherit" size="small" onClick={this.handleClose}>
                                      Close
                                    </Button>
                                  }
                                  className="errorMessage"
                                />
								</form>
							</CardContent>
							<CardActions className="cardFooter">
                  				<Button onClick={(e) => this.validateNewPoll(currentUser, dispatch, history)} color="secondary">
                  					Submit Poll
                  				</Button>
          					</CardActions>
						</Card>
					</div>
				)
        	} else {
              	content = (
          			<div className="pollContainer">
          				<AvatarCard user={author} cardType={cardType} />
						<PollCard className="contentPanel" question={question} totalUsers={Object.keys(users).length} currentUser={currentUser}/>
					</div>
				)
			}
        } else {
        	content = (<ErrorMessage/>) 
        }
      
    	return (
        	<div className="poll">
      			{content}
     		</div>	
        )
    }
}

function mapStateToProps({users, currentUser, questions, dataLoadState}) {
  	return {
      	currentUser: currentUser,
    	userIds: Object.keys(users),
      	users: users,
      	questions: questions,
      	dataLoadState: dataLoadState
    }
}

export default connect(mapStateToProps)(Poll);
