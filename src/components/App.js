import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {connect} from "react-redux"
import {loadData} from "../actions/commonActions"
import LoginScreen from "./LoginScreen"
import Navigation from "./Navigation"
import Dashboard from "./Dashboard"
import Poll from "./Poll"
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import util from "../utils/common"

function Loader(props) {
	return (
    	<div>
        	<LinearProgress/>
      		<h2>Please Wait...</h2>
        </div>
    )  
}
    
class App extends Component {
  	state = {
		storeStatus: "loading"      
    }
  
	componentDidMount() {
  		this.props.dispatch(loadData())	  
  	}
  
	render() {
      	const dataLoaded = (this.props.dataLoadState)
    	const currentUser = this.props.currentUser
      	var userFirstName
      	var questions
      	var viewToDisplay
      
     	if (!dataLoaded || dataLoaded === "started") {
            viewToDisplay = (<Loader/>)
    	} else if (currentUser && currentUser !== "null") {
        	userFirstName = util.getFirstName(this.props.users[currentUser])//currentUser ? this.props.users[currentUser].name.split(" ")[0] : ""
        	questions = this.props.questions
        } else {
           	viewToDisplay = (<LoginScreen users={this.props.users} userIds={this.props.userIds}/>)
        }

  		return (          
            <Router>    
          		<Card id="appContainer">
                    {dataLoaded && (currentUser && currentUser !== "null") ? 
                        <div>
                            <Navigation currentUser={currentUser} userFirstName={userFirstName} history={this.props.history}/>
                          	<Switch>
                                <Route path="/" exact render={(props) => <Dashboard {...props} currentUser={currentUser} questions={this.props.questions}/>} />
                                <Route path="/question/:questionId" render={(props) => <Poll {...props} questions={this.props.questions}/>}/>
                                <Route path="/add" render={(props) => <Poll {...props} currentUser={currentUser} questions={this.props.questions} cardType="newPoll"/>}/>
                            </Switch>
                        </div> :
                        <div>
							{viewToDisplay}
          				</div>
                    }
        		</Card>
            </Router>
    	);
  	}
}

function mapStateToProps({users, currentUser, questions, dataLoadState}) {
  	let localStorage_currentUser = localStorage.getItem("currentUser")
	console.log("mapping state...")
  
    if (localStorage_currentUser && localStorage_currentUser !== "null") {
    	console.log(".....a user is logged in...");  
      	if (dataLoadState === "finished") {
        	currentUser = localStorage.getItem("currentUser")  
        }
    }
  
	return {
      	currentUser: currentUser,
    	userIds: Object.keys(users),
      	users: users,
      	questions: questions,
      	dataLoadState: dataLoadState
    }
}

export default connect(mapStateToProps)(App);
