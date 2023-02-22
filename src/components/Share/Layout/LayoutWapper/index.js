import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import Logo from 'components/Share/Logo';
import logo from 'images/logo.svg';
import arrowLeft from 'images/arrow-left.png';
import Icon from 'components/Common/Icon';
import dashboard from 'images/darhboard-black-icon.svg';

import './style.scss';

const { Header, Footer, Sider, Content } = Layout;

const TabletAndDesktopLayout = props => {
  const [isMenu, setMenu] = useState(true);
  return (
    <Layout className={`layout__wrapper ${props.className}`}>
      {
        isMenu && (
          <Sider theme="light" width={239} >
            <Logo src={logo} height={64} style={{ display: 'block', margin: '36px auto'}} />
            {props.sider}
          </Sider>
        )
      }
      <Layout>
        <Header>
          {props.header}
        </Header>
        <Content>
          <div className={`layout__sider-toggle-icon ${!isMenu && 'hide'}`} onClick={() => setMenu(!isMenu)}>
            <img src={arrowLeft} alt='sider toggle' />
          </div>
          {props.content}
        </Content>
        {
          !!props.footer && (
            <Footer>
              {props.footer}
            </Footer>
          )
        }
      </Layout>
    </Layout>
  )
}

const MobileLayout = props => {
  const [isMenu, setMenu] = useState(false);
  useEffect(() => {
    setMenu(isMenu ? false : isMenu);
    // eslint-disable-next-line
  }, [props.router.location])
  return (
    <Layout className={`layout__wrapper layout__wrapper--mobile ${props.className} ${!!isMenu && 'show-menu'}`}>
      <Header>
        <Icon src={dashboard} className="menu-icon" style={{ fontSize: 20}} onClick={() => setMenu(!isMenu)} />
        {props.header}
        {
          isMenu && (
            <div className="layout-header__actions">
              <div className='layout-header__menu'>
                {props.sider}
              </div>
            </div>
          )
        }
      </Header>
      {
        !!props.content && (
          <Content>
            {props.content}
          </Content>
        )
      }
      {
        !!props.footer && (
          <Footer>
            {props.footer}
          </Footer>
        )
      }
    </Layout>
  )
}

const LayoutWrapper = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [props.router.location])
  return isMobile ? <MobileLayout {...props} /> : <TabletAndDesktopLayout {...props} />;
}

LayoutWrapper.propTypes = {
  className: PropTypes.string,
  sider: PropTypes.element,
  header: PropTypes.element,
  content: PropTypes.element,
  footer: PropTypes.element,
  router: PropTypes.object,
};

export default LayoutWrapper;
