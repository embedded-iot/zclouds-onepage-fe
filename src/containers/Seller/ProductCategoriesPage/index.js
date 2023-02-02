import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import ProductCategoriesGrid from 'components/Seller/ProductCategoriesGrid';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

function ProductCategoriesPage(props) {
  const [totalCount, setTotalCount] = useState(0);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const successCallback = (response) => {
    setTotalCount(response.totalCount || 0);
  }
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Product Categories</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="Product Categories"
        description={`We found ${totalCount} results.`}
        currentBreadcrumb="Product Categories"
      />
      <div className="page-contents">
        <ProductCategoriesGrid
          redirectTo={props.push}
          successCallback={successCallback}
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
)(ProductCategoriesPage);
