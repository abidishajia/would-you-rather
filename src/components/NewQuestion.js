import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  card: {
    width: '45%',
    height: '150px',
    margin: '0 auto',
    marginTop: '200px',
    textAlign: 'center'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  }
});

class NewQuestion extends PureComponent {

  state = {
    optionOne: '',
    optionTwo: ''
  }

  handleOptionOneChange = (e) => {
    e.preventDefault()
    this.setState({
      optionOne : e.target.value
    })
  }

  handleOptionTwoChange = (e) => {
    e.preventDefault()
    this.setState({
      optionTwo : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    this.props.addPoll(optionOne, optionTwo)
    const { history } = this.props
    history.push('/')
  }

  render() {
    const { optionOne, optionTwo } = this.state
    const { classes } = this.props

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
            Add Questions:
            </Typography>
            <form onSubmit={this.handleSubmit} className={classes.container}>
                <TextField
                    id="multiline-flexible"
                    label="Option One"
                    multiline
                    rowsMax="4"
                    value={optionOne}
                    onChange={this.handleOptionOneChange}
                    className={classes.textField}
                    margin="normal"
                  />


                  <TextField
                    id="multiline-flexible"
                    label="Option Two"
                    multiline
                    rowsMax="4"
                    value={optionTwo}
                    onChange={this.handleOptionTwoChange}
                    className={classes.textField}
                    margin="normal"
                  />
                <Button color="primary" disabled={optionOne === '' || optionTwo === ''} type="submit">
                    ADD QUESTION
                </Button>
              </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addPoll: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo))
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(NewQuestion))