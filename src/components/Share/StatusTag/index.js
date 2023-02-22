import React from 'react';
import { Tag } from 'antd';
import { STATE_COLORS } from 'components/contants';

import './style.scss';

export default function StatusTag({ value, label, className, ...restProps }) {
  return (<Tag className={`status-tag__label ${className}`} color={STATE_COLORS[value] || 'default'} {...restProps}>{label}</Tag>);
}
