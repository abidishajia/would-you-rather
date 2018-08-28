import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const styles = {
  avatar: {
    margin: 10,
    paddingLeft: 10
  },
  bigAvatar: {
    width: 20,
    height: 20,
  },
  marginBot: {
    marginBottom: 20
  },
  inputWidth:{
    width: 200
  }
};


class Login extends PureComponent {

  state = {
    userId : '',
    redirectToReferrer: false
  }

  onUserChange = (userId) => { this.setState({ userId })}

  login = () => {
    const { userId } = this.state;
    this.props.dispatch(setAuthedUser(userId))
    this.setState({ redirectToReferrer: true })
  }

  

  render() {
    const { users, classes } = this.props;
    const { userId, redirectToReferrer} = this.state;

    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
  
    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div style={{textAlign: 'center', marginTop: '200px'}}>
        <Typography variant="headline" color="inherit" style={{marginBottom: '50px'}} > Welcome to Would You Rather? </Typography> 
        <form>
          <FormControl>
              <InputLabel>Please select a user</InputLabel>
              <Select 
                  value={userId} 
                  onChange={(event) => this.onUserChange(event.target.value)}
                  className={(classes.inputWidth)}
                  >

                {Object.keys(users).map(user =>
                    <MenuItem key={user} value={user}>
                        {users[user].name}
                  
                    <Avatar  
                      alt={user.name} 
                      src={users[user].avatarURL}
                      className={(classes.avatar, classes.bigAvatar)}
                    />
                    </MenuItem>)
                }
              </Select>
          </FormControl>

          <Button variant="outlined" color="primary" onClick={this.login} disabled={!userId} style={{marginLeft: '50px'}}>
            Login
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}


export default withStyles(styles)(connect(mapStateToProps)(Login))