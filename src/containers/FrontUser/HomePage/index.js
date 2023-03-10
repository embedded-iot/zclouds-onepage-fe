import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';

import './style.scss';

function HomePage(props) {
  return (
    <div className="page-wrapper--full-width home-page__wrapper">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="page-contents">

      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: path => dispatch(push(path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(HomePage);
