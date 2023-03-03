import React from 'react';
import { Helmet } from 'react-helmet';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SettingDetailBox from 'components/Seller/SettingDetailBox';
import { ROUTERS, SETTING_KEY_VALUES, SETTING_LABEL_VALUES } from 'components/contants';
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

  const handleGoBack = () => {
    if (subSettingKey) {
      props.push(ROUTERS.SELLER_SETTINGS + '/' + settingKey);
    } else {
      props.push(ROUTERS.SELLER_SETTINGS);
    }
  }

  const settingDetailsPage = (
    <div className="page-wrapper edit-domain-page__wrapper">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="page-contents">
        <SettingDetailBox
          settingKey={settingKey}
          subSettingKey={subSettingKey}
          redirectTo={props.push}
          goBack={handleGoBack}
        />
      </div>
    </div>
  )
  if (settingKey === SETTING_KEY_VALUES.STOREFRONT && !!subSettingKey) {
    return settingDetailsPage;
  }
  return (
    <Row className="setting-detail-page__wrapper">
      <Col span={6}>
        <SettingSiderBox
          title={title}
          settingKey={settingKey}
          subSettingKey={subSettingKey}
          breadcrumbRouters={breadcrumbRouters}
          redirectTo={props.push}
          goBack={handleGoBack}
        />
      </Col>
      <Col span={18}>
        {
          settingDetailsPage
        }
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
