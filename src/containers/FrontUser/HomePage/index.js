import React from 'react';
import { Helmet } from 'react-helmet';

export default function HomePage(props) {
  return (
    <div className="page-wrapper--full-width">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div clssName="page-contents">
        Home page
      </div>
    </div>
  );
}
