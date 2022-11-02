import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';

const { Header, Footer, Sider, Content } = Layout;

const TabletAndDesktopLayout = props => (
  <Layout className="layout__wrapper">
    <Header>
      {props.header}
    </Header>
    <Layout>
      <Sider theme="light" width={256}>
        {props.sider}
      </Sider>
      <Layout>
        <Content>
          {props.content}
        </Content>
        { !!props.footer && (
          <Footer>
            {props.footer}
          </Footer>
        ) }
      </Layout>
    </Layout>
  </Layout>
)

const MobileLayout = props => {
  const [isMenu, setMenu] = useState(false);
  const MenuIcon = isMenu ? CloseOutlined : MenuOutlined;
  useEffect(() => {
    setMenu(isMenu ? false : isMenu);
    // eslint-disable-next-line
  }, [props.router.location])
  return (
    <Layout className="layout__wrapper layout__wrapper--mobile">
      <Header>
        {props.header}
      </Header>
      <Sider theme="light" width={"100%"}>
        <MenuIcon style={{ fontSize: 20}} onClick={() => setMenu(!isMenu)} />
        <div className="sider-container" style={{display: isMenu ? 'block' : 'none' }}>{props.sider}</div>
      </Sider>
      <Content>
        {props.content}
      </Content>
      <Footer>
        {props.footer}
      </Footer>
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
  sider: PropTypes.element,
  header: PropTypes.element,
  content: PropTypes.element,
  footer: PropTypes.element,
  router: PropTypes.object,
};

export default LayoutWrapper;
