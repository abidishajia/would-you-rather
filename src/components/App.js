import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import QuestionDetails from './QuestionDetails'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import NavBar from './NavBar'
import Login from './Login'
import Error from './Error'
import { handleInitialData } from '../utils/api'
import PrivateRoute from './PrivateRoute';


class App extends Component {
 

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loggedOut } = this.props

    return (

      <Router>
        <div className="container">
          <NavBar />
          <Switch>
            <Route
              path="/"
              exact
              component={Login}
            />
            <PrivateRoute
              path="/dashboard"
              exact
              component={Dashboard}
            />
            <PrivateRoute
              path="/leaderboard"
              exact
              component={LeaderBoard}
            />
            <PrivateRoute
              path="/add"
              exact
              component={NewQuestion}
            />
            <PrivateRoute
              path="/questions/:id"
              exact
              component={QuestionDetails}
            />
            <Route
              component={Error}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}


function mapStateToProps ({ authedUser }) {
  return {
    loggedOut: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
