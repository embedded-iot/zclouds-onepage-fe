import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AddEditProductBox from 'components/Seller/AddEditProductBox';
import { ROUTERS } from 'components/contants';
import { AdminProductsService } from 'services';

function ProductDetailPage(props) {
  const [data, setData] = useState(null);
  const productId = parseInt(props.match.params.productId);
  const isEdit = !!productId;
  const pageTitle = isEdit ? 'Edit Product' : 'New Product';


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
    props.push(ROUTERS.SELLER_PRODUCTS);
  }
  if (isEdit && !data) {
    return null;
  }

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="page-contents">
        <AddEditProductBox
          id={productId}
          isEdit={isEdit}
          pageTitle={pageTitle}
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
)(ProductDetailPage);
