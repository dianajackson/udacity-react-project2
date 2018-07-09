import React, {Component} from "react"
import CardContent from '@material-ui/core/CardContent';
import util from "../utils/common"
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';

function AvatarCardHeader(props) {
  	let {user,  cardType} = props
    let userName = util.getFirstName(user)
    var title, subtitle, pollsCreated, pollsAnswered
    
    switch(cardType) {
      case "pollDetails":
        title = userName
      	subtitle = "wants to know"
        break
        
      case "leaderboard":
        pollsCreated = user.created
        pollsAnswered = user.answered
        title = userName
        subtitle = ""
        break
        
      case "newPoll":	
        title = "Hi, " + userName
        subtitle = "What do you want to ask?"
        break
        
      default:
        break
    }
    
  	if (cardType === "leaderboard") {
        return (
            <div className="avatarCardHeader">
				<div className="avatarCardTitle">{title}</div>
                <div className="avatarCardSubtitle">
                    <span>Created: {pollsCreated}</span> | <span>Answered: {pollsAnswered}</span>
                </div>
            </div>
        )  
    }
  
  	return (
    	<div className="avatarCardHeader">
      		<div className="avatarCardTitle">{title}</div>
      		<div className="avatarCardSubtitle">
      			{subtitle}
      		</div>
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
      	const {user, cardType, score} = this.props
        let className = "avatarCard " + cardType
        
    	return (
      		<div className={className}>
                <Card>
                  <CardContent>
                      <div> 
                          <AvatarCardHeader user={user} cardType={cardType} score={score}/>
                          <AvatarImage user={user}/>
                      </div>
                  </CardContent>
          		</Card>
			</div>
          )
    }
}

export default (AvatarCard)