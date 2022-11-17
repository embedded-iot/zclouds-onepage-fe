import React from 'react';
import { Helmet } from 'react-helmet';
import { BannerBox, BannerBox1, BannerBox2, BannerBox3, BannerBox4 } from 'components/FrontUser/HomeBoxs';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import SignUpBannerBox from 'components/FrontUser/SignUpBannerBox';

import './style.scss';

function HomePage(props) {
  const isDesktop = useMediaQuery(RESPONSIVE_MEDIAS.DESKTOP);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  // eslint-disable-next-line
  const customClass = !!isTablet && 'home-box__wrapper--tablet' || !!isDesktop && 'home-box__wrapper--desktop';

  return (
    <div className="page-wrapper--full-width home-page__wrapper">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="page-contents">
        <BannerBox
          customClass={customClass}
          redirectTo={props.push}
        />
        <BannerBox1
          customClass={customClass}
          redirectTo={props.push}
        />
        <BannerBox2
          customClass={customClass}
          redirectTo={props.push}
        />
        <BannerBox3
          customClass={customClass}
          redirectTo={props.push}
        />
        <BannerBox4
          customClass={customClass}
          redirectTo={props.push}
        />
        <SignUpBannerBox />
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
)(HomePage);
