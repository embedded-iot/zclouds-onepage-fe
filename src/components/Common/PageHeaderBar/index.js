import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';
import React from 'react';

export default function PageHeaderBar({ title = '', isHome = false, goHome = null, goBack = null}) {
  return (
    <PageHeader
      backIcon={(!!goHome || !!goBack) ? (isHome ? <HomeOutlined /> : <ArrowLeftOutlined />) : null }
      onBack={() => isHome ? goHome() : goBack()}
      title={<span>{isHome && '/ '} {title}</span>}
    />
  );
}
