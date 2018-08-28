import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Error =({ location }) =>{
  return (
    <Fragment>
      <h3>No match for <code>{location.pathname}</code></h3>
      <h5> Looks like you've followed a broken link or entered a URL that doesn't exist on this site. </h5>
      <Link to="/" > Click here </Link> to go back to home page.
    </Fragment>
  );
}

export default Error
