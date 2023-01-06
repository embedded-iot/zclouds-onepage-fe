import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import BreadcrumbBox from 'components/Common/BreadcrumbBox';
import { ROUTERS } from 'components/contants';
import ProductDetailBox from 'components/FrontUser/ProductDetailBox';
import RelatedProductForProductDetail from 'components/FrontUser/RelatedProductForProductDetail';
import SignUpBannerBox from 'components/FrontUser/SignUpBannerBox';

import './style.scss';


function ProductDetailPage(props) {
  const { categoryName, categoryId, productName, productId } = props.match ? props.match.params : {};
  const breadcrumbRoutes = [
    {
      path: ROUTERS.FRONT_USER_ALL_PRODUCTS,
      breadcrumbName: 'All products',
    },
    {
      path: `${ROUTERS.FRONT_USER_ALL_PRODUCTS}/${categoryName}/${categoryId}`,
      breadcrumbName: categoryName,
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
          productId={productId}
          redirectTo={props.push}
        />
        <RelatedProductForProductDetail
          categoryId={categoryId}
          categoryName={categoryName}
          redirectTo={props.push}
        />
        <SignUpBannerBox />
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
