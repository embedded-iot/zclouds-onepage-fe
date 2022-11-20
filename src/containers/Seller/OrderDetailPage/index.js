import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import EditOrderBox from 'components/Seller/EditOrderBox';
import { Col, Row } from 'antd';

function OrderDetailPage(props) {
  const { orderId } = props.match ? props.match.params : {};
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Edit Order</title>
      </Helmet>
      <PageHeader
        title="Orders"
        description={`Order ID: ${orderId}`}
      />
      <div className="page-contents">
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <EditOrderBox id={orderId}
                          redirectTo={props.push}
            />
          </Col>
        </Row>
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
