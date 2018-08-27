import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Question from './Question'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class DashBoard extends PureComponent {

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
  
    const { answeredPolls, unansweredPolls,classes } = this.props
    const { value } = this.state;
  
    return (
      <div className={classes.root} style={{width: '55%', paddingLeft: '340px', marginTop: '20px'}}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Unaswered Question" />
            <Tab label="Answered Question" />
          </Tabs>
        </AppBar>

        {value === 0 && <TabContainer>
          {unansweredPolls.map(qid =>
            <div key={qid}>
                <Question id={qid}/> 
            </div>
        )}
          
        </TabContainer>}
        {value === 1 && <TabContainer>
          {answeredPolls.map(qid =>
            <div key={qid}>
              <Question id={qid}/>
            </div>
        )}
        </TabContainer>}
      </div>
    );
  }
}

function mapStateToProps ({ polls, users, authedUser }) {
  const user = users[authedUser];

  const answeredPolls = Object.keys(user.answers)
    .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
  
  return {
    answeredPolls,
    unansweredPolls : Object.keys(polls).filter(qid => !answeredPolls.includes(qid))
      .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
  }
}

export default withStyles(styles)(connect(mapStateToProps)(DashBoard))