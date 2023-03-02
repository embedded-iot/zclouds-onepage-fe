import React from 'react';
import { Helmet } from 'react-helmet';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SettingDetailBox from 'components/Seller/SettingDetailBox';
import { ROUTERS, SETTING_LABEL_VALUES } from 'components/contants';
import { Col, Row } from 'antd';
import SettingSiderBox from 'components/Seller/SettingSiderBox';


import './style.scss';

function SettingDetailPage(props) {
  const { settingKey, subSettingKey } = props.match ? props.match.params : {};
  const title = SETTING_LABEL_VALUES[settingKey];
  const breadcrumbRouters = [
    {
      path: ROUTERS.SELLER_SETTINGS,
      breadcrumbName: 'Settings',
    },
    {
      breadcrumbName: title,
    },
  ]
  return (
    <Row className="store-detail__container">
      <Col span={6}>
        <SettingSiderBox
          title={title}
          settingKey={settingKey}
          subSettingKey={subSettingKey}
          breadcrumbRouters={breadcrumbRouters}
          redirectTo={props.push}
          goBack={props.goBack}
        />
      </Col>
      <Col span={18}>
        <div className="page-wrapper store-detail__wrapper">
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <div className="page-contents">
            <SettingDetailBox
              settingKey={settingKey}
              subSettingKey={subSettingKey}
              redirectTo={props.push}
            />
          </div>
        </div>
      </Col>
    </Row>
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
    goBack: () => dispatch(goBack()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(SettingDetailPage);
