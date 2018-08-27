import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


const Question = (props) => {
  const loadDetails = (e ,id) => {
    e.preventDefault()
    props.history.push(`/questions/${id}`)
  }
  
  const { poll, classes } = props;
  return (
    <div>
      <Card className={classes.card} onClick={(e) => loadDetails(e, poll.id)}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
              Would You Rather
          </Typography>
          <List component="nav">
            <ListItem button>
              <ListItemText primary={poll.optionOne.text} />
            </ListItem>
            <ListItem button component="a" href="#simple-list">
              <ListItemText primary={poll.optionTwo.text} />
            </ListItem>
        </List>
        </CardContent>
      </Card>
    </div>
  )
}

function mapStateToProps ({ polls }, { id }) {
  return {
    poll : polls[id]
  }
}

export default  withStyles(styles)(withRouter(connect(mapStateToProps)(Question)))