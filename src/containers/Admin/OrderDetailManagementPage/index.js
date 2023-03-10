import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import AddEditOrderBox from 'components/Admin/AddEditOrderBox';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { AdminOrdersService, FrontUserProductsService } from 'services';
import { useMediaQuery } from 'react-responsive';

function OrderDetailManagementPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [data, setData] = useState(null);
  const orderId = parseInt(props.match.params.orderId);
  const isEdit = true;
  const pageTitle = isEdit ? 'Edit Order' : 'Create Order';
  const pageDescription = isEdit ? `Order ID: ${orderId}` : 'Great job, your dashboard is ready to go! Grow your business with Fulfill.';

  const getProduct = (productId, successCallback, failureCallback) => {
    FrontUserProductsService.getProductDetail(productId, successCallback, failureCallback)
  }

  const getOrder = orderId => {
    AdminOrdersService.getOrder(orderId, order => {
      const { address1, address2, city, country, fullName, phoneNumber, region, zipCode } = order.orderShipping;
      let data = {
        ...order,
        address1, address2, city, country, fullName, phoneNumber, region, zipCode
      };
      if (!!order.productId) {
        getProduct(order.productId, product => {
          data = {
            ...data,
            product
          };
          setData(data);
        }, error => {
          setData(data);
        })
      } else {
        setData(data);
      }

    })
  }

  useEffect(() => {
    if (isEdit) {
      getOrder(orderId);
    }
    // eslint-disable-next-line
  }, [orderId])

  const goOrdersPage = () => {
    props.push(ROUTERS.ADMIN_ORDERS_MANAGEMENT);
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
)(OrderDetailManagementPage);
