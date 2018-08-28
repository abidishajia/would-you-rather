import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import QuestionDetails from './QuestionDetails'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import NavBar from './NavBar'
import Login from './Login'
import Error from './Error'
import { handleInitialData } from '../utils/api'


class App extends PureComponent {
 

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loggedOut } = this.props

    return (
      <Router>
        <Fragment>
          <div className="main-container">
            <NavBar />
            <div className="container">
              <Switch>
                {
                  loggedOut ? 
                  <Fragment>
                    <Route path='/' exact component={Login} /> 
                    <Route path='/questions/:id' component={Login} />
                    <Route path='/add' component={Login} />
                    <Route path='/leaderboard' component={Login} />
                  </Fragment>
                  :
                  <Fragment>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' component={QuestionDetails} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    
                  </Fragment>
                }
                <Route component={Error} />
              </Switch>
            </div>
          </div>
        </Fragment>
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