import React from 'react';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageHeader from 'components/Share/PageHeader';
import SettingsGrid from 'components/Seller/SettingsGrid';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

function SettingsPage(props) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  return (
    <div className="page-wrapper layout__wrapper--box">
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <PageHeader
        className={isMobile && 'box-card--mobile'}
        title="Settings"
      />
      <div className="page-contents">
        <SettingsGrid redirectTo={props.push} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    router: state.router,
    systemConfigs: state.global.systemConfigs || [],
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
)(SettingsPage);
