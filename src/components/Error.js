import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <Fragment>
      <h3> Page Not found </h3>
      <h5> Looks like you've followed a broken link or entered a URL that doesn't exist on this site. </h5>
      <Link to="/" > Click here </Link> to go back to home page.
    </Fragment>
  );
}

export default Error