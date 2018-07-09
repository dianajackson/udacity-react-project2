import React, {Component} from "react"
import {connect} from "react-redux"
import AvatarCard from './AvatarCard';
import Badge from '@material-ui/core/Badge';

class Leaderboard extends Component {
 	render() {
      	let {users, userIds, currentUser, cardType} = this.props
      
        function sortByScore(a, b) {
          	var answered, created
            
            function updateUserProperties(user) {
              	user = Object.assign({}, user)
              
          		answered = Object.keys(user.answers).length
          		created = user.questions.length  
              
                if (user.score === undefined) {
                	user.score = created + answered
                  	user.created = created
                  	user.answered = answered
                }
              
				return user
            }
          
          	a = updateUserProperties(users[a])
          	b = updateUserProperties(users[b])

      		a = a.score;
      		b = b.score;
      
      		if (a > b) {
      			return -1;
    		}

			if (a < b) {
             	return 1; 
            }

			return 0;
    	}
      
      	if (this.props.dataLoadState !== "finished") {
			return(<h2>Calculating Scores...</h2>)      
    	}
      
		cardType = cardType || "leaderboard"
        userIds.sort(sortByScore)
	
    	return (
        	<div className="leaderboard">
             	<h2>Leaderboard</h2>
      			<div className="leaderboardGrid">
                	{userIds.map((userId) => {
                    	var user = Object.assign({}, users[userId])
                      	var score 
                        let badgeColor = currentUser === userId ? "primary" : "secondary"

                        user.created = user.questions.length
                        user.answered = Object.keys(user.answers).length
          				score = user.created + user.answered
          
                      	return <div key={userId} className="gridItem">
          						<Badge className="badge" badgeContent={score || 0} color={badgeColor}>
									<AvatarCard user={user} cardType={cardType}/>
                                </Badge>
          					</div>
                    })}
            	</div>
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

export default connect(mapStateToProps)(Leaderboard);
