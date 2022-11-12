import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import StoresTable from 'components/Seller/StoresTable';

function StoresPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Stores</title>
      </Helmet>
      <PageHeader
        title="Stores"
      />
      <div className="page-contents">
        <StoresTable redirectTo={props.push}/>
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
)(StoresPage);
