import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ProductCategoriesGrid from 'components/Seller/ProductsGrid';

function ProductsPage(props) {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="page-contents">
        <ProductCategoriesGrid
          redirectTo={props.push}
        />
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
)(ProductsPage);
