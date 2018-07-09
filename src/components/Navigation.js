import React, {Component} from "react"
import {NavLink, withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {logoutUser} from "../actions/currentUserActions"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navigation extends Component {

  	logoutUser = (currentUser, history) => {
      	console.log(currentUser + "logged out");
  		this.props.dispatch(logoutUser())	
      	localStorage.setItem("currentUser", null);
        this.props.history.push("/")
    }
  
 	render() {
    	const currentUser = this.props.userFirstName;
		const history = this.props.history
      
      	return (
          	<AppBar position="static" color="default">
            	<Toolbar>
                  	<nav id="navigation">
                    	<NavLink to='/' exact className="item">
                        	<Button variant="contained" color="primary">{currentUser}'s Dashboard</Button>
                    	</NavLink>

                    	<NavLink to='/' className="item">
                        	<Button variant="contained" color="primary">Leaderboard</Button>
                    	</NavLink>

                    	<NavLink to='/add' exact className="item">
                        	<Button variant="contained" color="primary">New Question</Button>
                    	</NavLink>
                  	</nav>

					<Button className="alignRight" color="inherit" onClick={(e) => this.logoutUser(currentUser, history)}>
                      	Logout
                  	</Button>
              </Toolbar>
            </AppBar>
      ) 
    }
}

export default connect()(withRouter(Navigation))
