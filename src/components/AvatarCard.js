import React, {Component} from "react"
import CardContent from '@material-ui/core/CardContent';
import util from "../utils/common"
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';

function AvatarCardHeader(props) {
  	let user = props.user
    let userName = util.getFirstName(user)
    let cardType = props.cardType
    var title, subtitle, pollsCreated, pollsAnswered, score
    
    switch(cardType) {
      case "pollDetails":
        title = userName
      	subtitle = "wants to know"
        break
        
      case "leaderboard":
        pollsCreated = props.user.pollsCreated
        pollsAnswered = props.user.pollsAnswered
        score = props.user.score
        title = userName
        subtitle = "<div>Created {pollsCreated}</div><div>Answered: {pollsAnswered}</div>"
        break
        
      case "newPoll":	
        title = "Hi, " + userName
        subtitle = "What do you want to ask?"
        break
        
      default:
        break
    }
    
  	return (
    	<div className="avatarCardHeader">
      		<div className="avatarCardTitle">{title}</div>
      		<div className="avatarCardSubtitle">{subtitle}</div>
      	</div>
    )
}

function AvatarImage(props) {
  	let user = props.user
  	return (
    	<Avatar className="avatar" src={user.avatarURL}/>
    )
}

class AvatarCard extends Component {
 	render() {   
      	const {user, cardType} = this.props
        
    	return (
      		<div className="avatarCard">
                <Card>
                  <CardContent>
                      <div> 
                          <AvatarCardHeader user={user} cardType={cardType}/>
                          <AvatarImage user={user}/>
                      </div>
                  </CardContent>
          		</Card>
			</div>
          )
    }
}

export default (AvatarCard)