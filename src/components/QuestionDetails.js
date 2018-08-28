import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveAnswer } from '../actions/shared'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { Avatar } from '@material-ui/core';

const styles = {
  checked: {},
  card:{
    width: '45%',
    margin: '0 auto',
    marginTop: '200px',
    textAlign: 'center'
  },
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
  avatar: {
    margin: 10,
    paddingLeft: 10
  },
  bigAvatar: {
    width: 80,
    height: 80,
  }
};

class QuestionDetails extends PureComponent {

  state = {
    selectedOption: ''
  }

  handleChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.savePollAnswer(this.state.selectedOption)
  }

  render() {
    const { poll, QuestionIssAnswered, isOneAnswered,authorName, authorURL, classes, percOne, percTwo, percOneLength, percTwoLength} = this.props

    console.log(this.props)
    if (!poll) {
      return <Redirect to='/404' />
    }

    const { selectedOption } = this.state
    const optionOneSelected = isOneAnswered ? { color: 'purple'} : { color: 'black' }
    const optionTwoSelected = !isOneAnswered ? { color: 'purple'} : { color: 'black' }


    return (
      <div>
      <Card className={classes.card}>
          <CardContent>
            <Avatar  
                alt='image of the user' 
                src={authorURL}
                className={(classes.avatar, classes.bigAvatar)}
            />
            <span style={{marginBottom: '20px'}}> {authorName} wants to know: </span>
            {QuestionIssAnswered?
              <div>
                  <div style={optionOneSelected}> 
                    <span>{percOneLength} people voted for {poll.optionOne.text} </span>
                    {`${percOne}%`}
                  </div>
                  <div style={optionTwoSelected}>
                  <span>{percTwoLength} people voted for {poll.optionTwo.text} </span>
                    {`${percTwo}%`}
                  </div>
                </div>
                
                :
                <form onSubmit={this.handleSubmit}>
                <FormControl component="fieldset">
                     <RadioGroup
                      aria-label="Questions"
                      name="Questions"
                      value={this.state.selectedOption}
                      onChange={this.handleChange}
                     > 
                      <FormControlLabel value="optionOne"  control={<Radio />} label={poll.optionOne.text}/>
                      <FormControlLabel value="optionTwo"  control={<Radio />} label={poll.optionTwo.text}/>
                    </RadioGroup>
                  </FormControl>
                  <Button disabled={selectedOption === ''} type='submit'>Submit</Button>
                </form>
              }
          </CardContent>
        </Card>
    </div>
    );
  }
}



function mapStateToProps ({ polls, users, authedUser }, props) {
  const { id } = props.match.params
  const poll = polls[id]

  if (typeof poll === "undefined") {
    return {
      notFound: true
    };
  }

  const pollAuthor = users[poll.author];
  const authorURL = pollAuthor.avatarURL
  const authorName = pollAuthor.name
  const isOneAnswered = poll.optionOne.votes.includes(authedUser)
  const isTwoAnswered = poll.optionTwo.votes.includes(authedUser)
  const QuestionIssAnswered = isOneAnswered || isTwoAnswered
 
  const percOneLength = poll.optionOne.votes.length
  const percTwoLength = poll.optionTwo.votes.length

  const percOne = (percOneLength / (percOneLength + percTwoLength) * 100).toFixed(2)
  const percTwo = (percTwoLength / (percOneLength + percTwoLength) * 100).toFixed(2)

  return {
    poll,
    pollAuthor,
    QuestionIssAnswered,
    isOneAnswered,
    percOne,
    percTwo,
    percOneLength,
    percTwoLength,
    authorURL,
    authorName,
  }
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params
  return {
    savePollAnswer: (answer) => {
      dispatch(handleSaveAnswer(id, answer))
    }
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QuestionDetails))