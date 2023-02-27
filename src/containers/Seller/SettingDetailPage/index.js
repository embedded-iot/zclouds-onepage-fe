import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import SettingDetailBox from 'components/Seller/SettingDetailBox';
import { RESPONSIVE_MEDIAS, ROUTERS, SETTING_LABEL_VALUES } from 'components/contants';

import './style.scss';
import { useMediaQuery } from 'react-responsive';

function SettingDetailPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const { settingKey } = props.match ? props.match.params : {};
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
    <div className="page-wrapper store-detail__wrapper">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title={title}
        breadcrumbRouters={breadcrumbRouters}
      />
      <div className="page-contents">
        <SettingDetailBox
          settingKey={settingKey}
          redirectTo={props.push}
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
)(SettingDetailPage);
