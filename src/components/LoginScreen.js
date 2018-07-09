import React, {Component} from "react"
import {connect} from "react-redux"
import {setCurrentUser} from "../actions/currentUserActions"
import {setDataLoadState} from "../actions/commonActions"
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

class LoginScreen extends Component {
  	state = {
   		selectedUser: "", 
  	}

	handleChange = event => {
      	let selectedUser = event.target.value
    	this.setState({selectedUser: selectedUser });
  	};

  	authenticateUser = () => {
		var currentUserId = this.state.selectedUser

      	console.log(currentUserId + " just logged in");
        localStorage.setItem("currentUser", currentUserId);
      	this.props.dispatch(setDataLoadState("finished"))
  		this.props.dispatch(setCurrentUser(currentUserId))	  
    }

 	render() {   
    	return (
      		<div id="loginScreen">
				<CardMedia id="loginImage" image="https://www.spinutech.com/webres/Image/digital-marketing/2018-would-you-rather-blogtop.png"/>
                <CardContent>
                	<div> 
                  		<Select name="selectedUser" value={this.state.selectedUser} onChange={this.handleChange} displayEmpty>  
                  			<MenuItem value="">Select a User...</MenuItem>
                  				{this.props.userIds.map((id) => {
                   					return <MenuItem key={id} value={id}>{this.props.users[id].name}</MenuItem>          
                  				})}
                  		</Select>
					</div>
				</CardContent>
				<CardActions className="cardFooter">
                  	<Button onClick={this.authenticateUser}>
                  		Login
                  	</Button>
          		</CardActions>
			</div>
          )
    }
}

export default connect()(LoginScreen)