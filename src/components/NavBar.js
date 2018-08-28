import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = themes => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuButtonF: {
      marginRight: 0,
    },
  icon: {
      margin: themes.spacing.unit * 2,
  },
  avatar: {
    margin: 10,
    paddingLeft: 10
  },
  bigAvatar: {
    width: 20,
    height: 20,
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /> 
    </SvgIcon>
  );
}


class NavBar extends PureComponent {
  state = {
    isOpen: false
  }

  toggle = () =>  {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogOut = () => {
    this.props.dispatch(unsetAuthedUser());
  }

  render() {
    const { authedUser, classes} = this.props;
    
    return (
       <div>

         <AppBar position="static">
            <Toolbar>
              { authedUser &&
                  <Fragment>
                  <Typography variant="title" color="inherit">
                    <Link to= '/dashboard'>
                        <HomeIcon className={classes.icon} color="secondary"/>
                    </Link> 
                  </Typography>
                    <Typography variant="title" color="inherit" className={classes.menuButton}>
                          <Link to= '/add'> New Question |  </Link>  
                    </Typography>
                    <Typography variant="title" color="inherit"  className={classes.menuButton}>
                          <Link to= '/leaderboard'>  Leader Board  |</Link>  
                    </Typography>
                    <Typography variant="caption" color="inherit" className={classes.menuButton}>
                          Hello, {authedUser} 
                    </Typography>
                    <Button color="inherit"  className={classes.menuButtonF} onClick={this.handleLogOut}>
                          <Link to= '/'> Logout  </Link>  
                    </Button>
                  </Fragment>
              }
            </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}



export default withStyles(styles)(withRouter(connect(mapStateToProps)(NavBar)))