import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import AddEditOrderBox from 'components/Seller/AddEditOrderBox';
import { ROUTERS } from 'components/contants';

function OrderDetailPage(props) {
  const orderId = parseInt(props.match.params.orderId);
  const isEdit = !!orderId;
  const pageTitle = isEdit ? 'Edit Order' : 'Create Order';
  const pageDescription = isEdit ? `Order ID: ${orderId}` : 'Great job, your dashboard is ready to go! Grow your business with Lenful.';

  const order = {
    "productId": 0,
    "productName": "string",
    "quantity": 0,
    "mockupUrl": "http://localhost:3000/orders/0",
    "designUrl": "http://localhost:3000/orders/0",
    "storeId": 0,
    "orderNumber": "string",
    "orderNote": "string",
    "orderShipping": {
      "fullName": "string",
      "phoneNumber": "string",
      "address1": "string",
      "address2": "string",
      "country": "string",
      "zipCode": "string",
      "region": "string",
      "city": "string"
    }
  };
  const data = {
    ...order,
    ...order.orderShipping,
  }

  const goOrdersPage = () => {
    props.push(ROUTERS.SELLER_ORDERS);
  }

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
          data={isEdit ? data : undefined}
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
