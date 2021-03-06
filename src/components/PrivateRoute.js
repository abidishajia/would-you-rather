import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ component: Component, ...rest }) {
  const { authedUser } = rest;
  return (
    <Route
      {...rest}
      render={props => (
        authedUser !== null
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/',
              state: { from: props.location.pathname } ,
            }}
          />
      )}
    />
  );
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(PrivateRoute);