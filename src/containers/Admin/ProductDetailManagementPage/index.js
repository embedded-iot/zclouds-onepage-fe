import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import AddEditProductBox from 'components/Admin/AddEditProductBox';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { AdminProductsService } from 'services';
import { useMediaQuery } from 'react-responsive';

function ProductDetailManagementPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [data, setData] = useState(null);
  const productId = parseInt(props.match.params.productId);
  const isEdit = !!productId;
  const pageTitle = isEdit ? 'Edit Product' : 'Create Product';
  const pageDescription = isEdit ? `Product ID: ${productId}` : 'Great job, your dashboard is ready to go! Grow your business with Fulfill.';


  const getProduct = productId => {
    AdminProductsService.getProduct(productId, product => {
     setData(product);
    })
  }

  useEffect(() => {
    if (isEdit) {
      getProduct(productId);
    }
    // eslint-disable-next-line
  }, [productId])

  const goProductsPage = () => {
    props.push(ROUTERS.ADMIN_PRODUCTS_MANAGEMENT);
  }
  if (isEdit && !data) {
    return null;
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}title={pageTitle}
        description={pageDescription}
      />
      <div className="page-contents">
        <AddEditProductBox
          id={productId}
          isEdit={isEdit}
          data={data}
          redirectTo={props.push}
          onOk={goProductsPage}
          onCancel={goProductsPage}
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
)(ProductDetailManagementPage);
