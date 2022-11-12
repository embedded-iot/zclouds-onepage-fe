import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import EditStoreBox from 'components/Seller/EditStoreBox';
import { Col, Row } from 'antd';

function StoresPage(props) {
  const { storeId } = props.match ? props.match.params : {};
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Edit Store</title>
      </Helmet>
      <PageHeader
        title="Stores"
        description={`Store ID: ${storeId}`}
      />
      <div className="page-contents">
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <EditStoreBox id={storeId}
                          onFinish={() => {}}
                          onCancel={() => {}}
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
)(StoresPage);
