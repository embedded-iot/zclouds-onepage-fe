import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const { Header, Footer, Sider, Content } = Layout;


const LayoutWrapper = (props) => {
  return (
    <Layout>
      <Sider theme="light" width={256}>
        {props.logo}
        {props.sider}
      </Sider>
      <Layout>
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
    </Layout>
  );
}

LayoutWrapper.propTypes = {
  logo: PropTypes.element,
  sider: PropTypes.element,
  header: PropTypes.element,
  content: PropTypes.element,
  footer: PropTypes.element,
};

export default LayoutWrapper;
