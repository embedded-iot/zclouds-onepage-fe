import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';

const { Header, Footer, Content } = Layout;

const TabletAndDesktopLayout = props => {
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  return (
    <Layout className={`public-layout__wrapper ${isTablet ? 'public-layout__wrapper--tablet' : 'public-layout__wrapper--desktop'}`}>
      <Header>
        {props.header}
      </Header>
      <Content>
        {props.content}
      </Content>
      <Footer>
        {props.footer}
      </Footer>
    </Layout>
  )
}

const MobileLayout = props => {
  const [isMenu, setMenu] = useState(false);
  const MenuIcon = isMenu ? CloseOutlined : MenuOutlined;
  useEffect(() => {
    setMenu(isMenu ? false : isMenu);
    // eslint-disable-next-line
  }, [props.router.location])
  return (
    <Layout className={`public-layout__wrapper public-layout__wrapper--mobile ${!!isMenu && 'show-menu'}`}>
      <Header>
        {props.header}
        <MenuIcon className="menu-icon" style={{ fontSize: 20}} onClick={() => setMenu(!isMenu)} />
      </Header>
      <Content>
        {props.content}
      </Content>
      <Footer>
        {props.footer}
      </Footer>
    </Layout>
  )
}

const PublicLayoutWrapper = (props) => {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [props.router.location])
  return isMobile ? <MobileLayout {...props} /> : <TabletAndDesktopLayout {...props} />;
}

PublicLayoutWrapper.propTypes = {
  header: PropTypes.element,
  content: PropTypes.element,
  footer: PropTypes.element,
  router: PropTypes.object,
};

export default PublicLayoutWrapper;
