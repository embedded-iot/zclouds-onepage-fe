import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import AddEditOrderBox from 'components/Seller/AddEditOrderBox';
import { ROUTERS } from 'components/contants';
import { FrontUserCategoriesService, SellerOrdersService, SellerStoresService } from 'services';

function OrderDetailPage(props) {
  const [data, setData] = useState(null);
  const orderId = parseInt(props.match.params.orderId);
  const isEdit = !!orderId;
  const pageTitle = isEdit ? 'Edit Order' : 'Create Order';
  const pageDescription = isEdit ? `Order ID: ${orderId}` : 'Great job, your dashboard is ready to go! Grow your business with Lenful.';

  const getStore = (storeId, successCallback) => {
    SellerStoresService.getStore(storeId, successCallback)
  }

  const getProduct = (productId, successCallback) => {
    FrontUserCategoriesService.getProductDetail(productId, successCallback)
  }


  const getOrder = orderId => {
    SellerOrdersService.getOrder(orderId, order => {
      let data = {
        ...order,
        ...order.orderShipping,
      };
      getStore(order.storeId, store => {
        data = {
          ...data,
          store
        };
        getProduct(order.productId, product => {
          data = {
            ...data,
            product
          };
          setData(data);
        })
      })
    })
  }

  useEffect(() => {
    if (isEdit) {
      getOrder(orderId);
    }
    // eslint-disable-next-line
  }, [orderId])

  const goOrdersPage = () => {
    props.push(ROUTERS.SELLER_ORDERS);
  }
  if (isEdit && !data) {
    return null;
  }
  console.log(data);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <PageHeader
        title={pageTitle}
        description={pageDescription}
      />
      <div className="page-contents">
        <AddEditOrderBox
          id={orderId}
          isEdit={isEdit}
          data={data}
          redirectTo={props.push}
          onOk={goOrdersPage}
          onCancel={goOrdersPage}
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
)(OrderDetailPage);
