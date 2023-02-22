import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';

const { Header, Content } = Layout;


const NormalLayoutWrapper = props => {
  return (
    <Layout className="normal-layout__wrapper">
      {
        !!props.header && (
          <Header>
            {props.header}
          </Header>
        )
      }
      <Content>
        {props.content}
      </Content>
    </Layout>
  );
}

NormalLayoutWrapper.propTypes = {
  header: PropTypes.element,
  content: PropTypes.element,
};

export default NormalLayoutWrapper;
