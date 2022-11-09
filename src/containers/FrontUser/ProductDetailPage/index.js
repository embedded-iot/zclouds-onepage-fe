import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import { ROUTERS } from 'components/contants';

import './style.scss';
import ProductDetailBox from 'components/FrontUser/ProductDetailBox';

function ProductDetailPage(props) {
  const { category, productName } = props.match ? props.match.params : {};
  const breadcrumbRoutes = [
    {
      path: ROUTERS.FRONT_USER_ALL_PRODUCTS,
      breadcrumbName: 'All products',
    },
    {
      path: `${category}`,
      breadcrumbName: category,
    },
    {
      breadcrumbName: productName,
    },
  ];
  return (
    <div className="page-wrapper product-detail-page__wrapper">
      <Helmet>
        <title>{productName}</title>
      </Helmet>
      <div className="page-contents">
        <BreadcrumbBox routes={breadcrumbRoutes} />
        <ProductDetailBox
          category={category}
          productName={productName}
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
)(ProductDetailPage);
